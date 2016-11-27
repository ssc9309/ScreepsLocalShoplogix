/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvestor'); // -> 'a thing'
 */
 
 module.exports = function (creep) {
    var storageVar = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
    {
        filter: function(object)
        {
            return (object.structureType == STRUCTURE_STORAGE && object.store[RESOURCE_ENERGY] > 0);
        }
    });

    if (storageVar)
    {
        //if (storageVar.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
        if (creep.withdraw(storageVar, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(storageVar);
        }
    }
    else
    {
        var targetExt = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
        {
            filter: function(object)
            {
                return (object.energy >= object.energyCapacity);
            }
        });
        
        if (targetExt)
        {
            //console.log(targetExt);
            //if (targetExt.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            if (creep.withdraw(targetExt, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(targetExt);
            }
        }
    }
}