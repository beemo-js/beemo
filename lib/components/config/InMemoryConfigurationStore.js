"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * In-memory configuration store.
 */
var InMemoryConfigurationStore = /** @class */ (function () {
    function InMemoryConfigurationStore(configuration) {
        if (configuration === void 0) { configuration = {}; }
        this.configuration = configuration;
    }
    InMemoryConfigurationStore.prototype.get = function (key) {
        try {
            return key.split('.').reduce(function (conf, part) { return conf[part]; }, this.configuration);
        }
        catch (_) {
            return undefined;
        }
    };
    InMemoryConfigurationStore.prototype.set = function (key, value) {
        var path = key.split('.');
        var finalKey = path.pop();
        var config = this.configuration;
        path.forEach(function (i) {
            if (!config[i])
                config[i] = {};
            config = config[i];
        });
        config[finalKey] = value;
    };
    return InMemoryConfigurationStore;
}());
exports.InMemoryConfigurationStore = InMemoryConfigurationStore;
