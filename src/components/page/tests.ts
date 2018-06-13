import {CallFactory} from "../http/factory/call/CallFactory";
import {Entity} from "../persistence/entity/Entity";
import {KVEntityStore} from "../persistence/entity/KVEntityStore";
import {Call} from "../http/call/Call";
import {Request} from "../http/abstractions/Request";
import {KVStore} from "../persistence/kvstore/KVStore";
import {HandledCall, UrlParam} from "../http/annotations/call_factory";
import {Page} from "./Page";
import {CallHttpClient} from "../http/call/CallHttpClient";

// Entities

class User implements Entity<number> {
    constructor(
        public id: number,
        public name: string
    ) {}
}

class Book implements Entity<number> {
    constructor(
        public id: number,
        public title: string,
        public author: User
    ) {}
}

// Stores

class UserStore extends KVEntityStore<User, number> {
    constructor(kvStore: KVStore) {
        super(kvStore, 'User')
    }
}

class BookStore extends KVEntityStore<Book, number> {
    constructor(kvStore: KVStore) {
        super(kvStore, 'Book')
    }

    async getByAuthor(authorId: number): Promise<Book[]> {
        return (await this.all()).filter(book => book.author.id === authorId)
    }
}

// Clients

class UserClient extends CallFactory {
    constructor() {
        super(User, new Request('/users'))
    }

    @HandledCall()
    getFromId(id: number): Call<User> {
        return this.get(`/${id}`)
    }
}

class BookClient extends CallFactory {
    constructor() {
        super(User, new Request('/users'))
    }

    @HandledCall()
    getByAuthor(@UrlParam('authorId') authorId: number): Call<Book[]> {
        return this.get(`/byAuthor`)
    }
}

// Page

class UserDashboardPage implements Page {
    constructor(
        private userDashboardData: UserDashboardData,
        private callHttpClient: CallHttpClient,
        private userClient: UserClient,
        private bookClient: BookClient
    ) {}

    async init(): Promise<void> {
        const [user, books] = await this.callHttpClient.retrieveData([
            this.userClient.getFromId(21),
            this.bookClient.getByAuthor(21)
        ])

        this.userDashboardData.user = user
        this.userDashboardData.books = books
    }
}

// Observable
class UserDashboardData {
    constructor(
        public user: User,
        public books: Book[]
    ) {}
}

