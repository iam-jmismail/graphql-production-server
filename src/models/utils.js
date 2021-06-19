const mongoose = require('mongoose');

module.exports = {
    applyDefaultFields(Schema) {
        Schema.add({
            modifiedOn: { type: Number, required: true },
            modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            createdOn: { type: Number, required: true },
            deleted: { type: Boolean, required: true, default: false },
        });

        return Schema;
    },

    applyDefaultHooks(Schema) {
        Schema.pre('validate', (done) => {
            if (!this.createdOn) this.createdOn = new Date().getTime();
            if (!this.modifiedOn) this.modifiedOn = new Date().getTime();
            return done();
        });

        Schema.pre('save', (done) => {
            this.modifiedOn = new Date().getTime();
            return done();
        });

        return Schema;
    },

};
