/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('truckModule'); // -> 'a thing'
 */
 
module.exports = function(creep)
{
    creep.say('T' + creep.body.length/2);

    var creepMemory = creep.memory;

    //similar to miner, assign a number

    
    //find the correct miner creep
    var minerCreep = null;
    for (var name in Game.creeps)
    {
        var minerCreep = Game.creeps[name];
        if (minerCreep.memory.role == 'miner' && 
            minerCreep.memory.number == creep.memory.number &&
            minerCreep.memory.spawnRoom == creep.memory.spawnRoom)
        {
            minerCreep = Game.creeps[name];
            break;
        }
    }
    
    //if the minercreep is found
    if (minerCreep)
    {
        //creep.say(minerCreep.name);
        //creep.say(Memory.creeps[creep.name].job);
        if (creepMemory.job == 'collect')
        {
            //collect until full
            //console.log(creep.name);
            if (creep.carry.energy < creep.carryCapacity)
            {
                var droppedEnergyTarget = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY,
                {
                    filter: function(object)
                    {
                        return object.energy >= creep.carryCapacity && object.room.name == creep.room.name;
                    }
                });
                //hank. this is temporary...
                //var droppedEnergyTarget = null;
                
                //console.log(droppedEnergyTarget.energy);
                if (droppedEnergyTarget)
                {
                    if (creep.pickup(droppedEnergyTarget) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(droppedEnergyTarget);
                    }
                }
                //if there is no dropped energy, then try to grab the energy from the container.
                //if no container, then the miner
                else
                {
                    var container = creep.pos.findClosestByPath(FIND_STRUCTURES,
                    {
                        filter: function(object)
                        { 
                            //console.log(object.structureType);
                            return object.structureType == STRUCTURE_CONTAINER && 
                                    object.store[RESOURCE_ENERGY] > 0 &&
                                    object.store[RESOURCE_ENERGY] >= creep.carryCapacity;
                        }
                    });
                    //console.log(container);
                    if (container)
                    {
                        if (container.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                        {
                            creep.moveTo(container);
                        }
                    }
                    else
                    {
                        if (minerCreep.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                        {
                            creep.moveTo(minerCreep);
                        }
                    }
                }
            }
            else
            {
                creepMemory.job = 'distribute';
            }
        }
        else
        {
            //distribute until empty
            
            if (creep.carry.energy > 0)
            {
                var targetExt = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
                {
                    filter: function(object)
                    {
                        return (object.structureType == STRUCTURE_EXTENSION || 
                                object.structureType == STRUCTURE_SPAWN) && 
                                (object.energy < object.energyCapacity) &&
                                object.room.name == creep.room.name;
                    }
                });
                
                if (targetExt)
                {
                    if (creep.transfer(targetExt, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(targetExt);
                    }
                }
                else
                //if (isExtensionsFull)
                {
                    var storageVar = creep.room.storage;

                    if (storageVar)
                    {
                        if (creep.transfer(storageVar, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                        {
                            creep.moveTo(storageVar);
                        }
                    }
                }
            }
            else
            {
                creepMemory.job = 'collect';
            }
        }
    }
    
    //and drop a road
    //creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD);
    
}