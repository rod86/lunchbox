const db = require('../database');
const seeder = require('mongoose-seed');
const data = require('../seeds/seeds');

const models = [];
data.forEach(item => models.push(item.model));

seeder.connect(db.getConnectionURI(), () => {
    db.loadModels();

    seeder.clearModels(models, () => {
        seeder.populateModels(data, () => {
            seeder.disconnect();
        });
    });
});