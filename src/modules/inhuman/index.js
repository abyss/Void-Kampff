const Fuse = require('fuse.js');

exports.config = {
    name: 'Inhuman Conditions',
    description: 'Commands to play Inhuman Conditions',
    debug: true
};

const modules = [
    {
        key: 'small_talk',
        name: 'Small Talk',
        description: 'Normal, everyday things and superficial details about your life'
    },
    {
        key: 'creative_problem_solving',
        name: 'Creative Problem Solving',
        description: 'Solve various hypothetical problems'
    },
    {
        key: 'imagination',
        name: 'Imagination',
        description: 'Invent original characters, stories, and ideas'
    },
    {
        key: 'cooperation_collaboration',
        name: 'Cooperation & Collaboration',
        description: 'Form teams to take on specific tasks, and consider group dynamics'
    },
    {
        key: 'hopes_dreams',
        name: 'Hopes & Dreams',
        description: 'Share various hopes, and explore how they interact with reality'
    },
    {
        key: 'body_integration',
        name: 'Body Integration',
        description: 'Imagine various physical experiences, and explain how your body would respond to them'
    },
    {
        key: 'grief',
        name: 'Grief',
        description: 'Share various tragic experiences from your life, and discuss how you dealt with them'
    },
    {
        key: 'threat_assessment',
        name: 'Threat Assessment',
        description: 'Assess the risks inherent in certain scenarios, and evaluate possible responses'
    },
    {
        key: 'moral_failings',
        name: 'Moral Failings',
        description: 'Share bad things you\'ve done, and discuss why they were wrong'
    },
    {
        key: 'self_image',
        name: 'Self Image',
        description: 'List some traits about yourself, and explain how they developed'
    },
    {
        key: 'recognizing_intentions',
        name: 'Recognizing Intentions',
        description: 'Imagine what people hope to achieve in various situations and reconsider your answers'
    }
];

exports.findModule = function (moduleText) {
    const options = {
        shouldSort: true,
        threshhold: 0.3, // between 0 (perfect) to 1 (complete mismatch)
        location: 0,
        distance: 100,
        maxPatternLength: 20,
        minMatchCharLength: 1,
        keys: [
            'key',
            'name',
        ]
    };

    const fuse = new Fuse(modules, options);
    const results = fuse.search(moduleText);
    return results[0].item;
};
