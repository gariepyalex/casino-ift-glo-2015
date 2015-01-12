module.export = function(id, name) {
    this.name = name;

    this.toJSON = function() {
        return {
            "id": id,
            "name": name
        };
    };
};
