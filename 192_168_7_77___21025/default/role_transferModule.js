/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('transferModule'); // -> 'a thing'
 */
 
module.exports = function(creep)
{
    creep.say('Tf' + creep.body.length / 2);
    
    if (Memory.creeps[creep.name].job == 'collect')
    {
        if (creep.carry.energy < creep.carryCapacity)
        {
            var storageVar = creep.room.storage;
            
            if (storageVar && storageVar.store[RESOURCE_ENERGY] > 0)
            {
                if (creep.withdraw(storageVar, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(storageVar);
                }
            }
        }
        else
        {
            Memory.creeps[creep.name].job = 'distribute';
        }
    }
    else
    {
        if (creep.carry.energy > 0)
        {   
            //fill up the extension and spawn first
    	    var targetExt = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
            {
                filter: function(object)
                {
                    return (object.structureType == STRUCTURE_EXTENSION || object.structureType == STRUCTURE_SPAWN) && 
                            (object.energy < object.energyCapacity);
                }
            });
                
            if (targetExt)
            {
                if (creep.transfer(targetExt, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(targetExt);
                }
            }
            //then fill up whatever
            else
            {
                var targetExt = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
                {
                    filter: function(object)
                    {
                        return (object.energy < object.energyCapacity);
                    }
                }
                );
                    
                if (targetExt)
                {
                    if (creep.transfer(targetExt, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(targetExt);
                    }
                }
            }
        }
        else
        {
            Memory.creeps[creep.name].job = 'collect';
        }
     }
 }