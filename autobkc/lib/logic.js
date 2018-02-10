'use strict';

var pkgAsset = 'org.corentin.autobkc.assets';
var pkgCar = 'org.corentin.autobkc.assets.Car';

var pkgParticipants = 'org.corentin.autobkc.participants';
var pkgSeller = 'org.corentin.autobkc.participants.Seller';

/**
 * Allow to sell a car
 * @param {org.corentin.autobkc.transactions.BuildCarTransaction}  tx
 * @transaction
 */
function buildCarTransaction(tx) {
    var factory = getFactory();
    var newCar = factory.newResource(pkgAsset, 'Car', makeId(8));
    newCar.brand = tx.brand;
    newCar.model = tx.model;
    newCar.owner = factory.newRelationship(pkgParticipants, 'Seller', getCurrentParticipant().getIdentifier());
    return getAssetRegistry(pkgCar)
        .then(function(ar) {
            return ar.add(newCar);
        });
}


/**
 * Allow to sell a car
 * @param {org.corentin.autobkc.transactions.SaleTransaction} tx
 * @transaction
 */
function sellCarTransaction(tx) {
    return getAssetRegistry(pkgCar)
        .then(function(cr) {
            carRegistry = cr;
            return carRegistry.get(tx.carId);
        })
        .then(function(car) {
            var pType = tx.owner.getType();
            var factory = getFactory();
            car.owner = factory.newRelationship(pkgParticipants, pType, tx.owner.getIdentifier());
            return carRegistry.update(car);
        });
}


function makeId(n){
    var id = "";
    for (var i = 0;i<n;i++) {
        id = id + Math.floor(Math.random() * Math.floor(10))
    }
    return id;
}