const Fuse = require('fuse.js');
const bot = require('../../bot');

exports.config = {
    name: 'Inhuman Conditions',
    description: 'Commands to play Inhuman Conditions',
    debug: true
};

exports.findModule = async function (moduleText) {
    const options = {
        shouldSort: true,
        threshhold: 0.3, // between 0 (perfect) to 1 (complete mismatch)
        location: 0,
        distance: 100,
        maxPatternLength: 20,
        minMatchCharLength: 1,
        keys: [
            'name',
        ]
    };

    const modules = await bot.db.get('modules', 'list');
    const fuse = new Fuse(modules, options);
    const results = fuse.search(moduleText);
    return results[0].item;
};
