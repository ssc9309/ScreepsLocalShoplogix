/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('testModule'); // -> 'a thing'
 */
 
module.exports = function(creep)
{
    creep.say("RB");
    
    var testFlag = Game.flags.rangeBuild;
    var building = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    

    //console.log(creep.carry.energy);

    if (testFlag)
    {
        if (testFlag.pos.roomName != creep.room.name)
        {
            if (creep.carry.energy <= 0)
            {
                if (creep.room.storage)
                {
                    if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(creep.room.storage);
                    }
                }
            }
            else
            {
                creep.moveTo(testFlag);
            }
        }
        else
        {
            if (building)
            {
                if(Memory.creeps[creep.name].job == 'mine')
                {
                    if (creep.carry.energy < creep.carryCapacity)
                    {
                        var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY,
                            {
                                filter: function(object)
                                {
                                    return object.energy >= creep.carryCapacity;
                                }
                            });

                        if (droppedEnergy)
                        {
                            if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE)
                            {
                                creep.moveTo(droppedEnergy);
                            }
                        }
                        else
                        {
                            var source = creep.pos.findClosestByPath(FIND_SOURCES,
                            {
                                filter: function(object)
                                {
                                    return object.energy > 0;
                                }
                            });
                            
                            if (source && creep.harvest(source) == ERR_NOT_IN_RANGE)
                            {
                                creep.moveTo(source);
                            }
                        }
                    }
                    else
                    {
                        Memory.creeps[creep.name].job = 'build';
                    }
                }
                else
                {
                    if (creep.carry.energy > 0)
                    {
                        if (creep.build(building) == ERR_NOT_IN_RANGE)
                        {
                            creep.moveTo(building);
                        }
                    }
                    else
                    {
                        Memory.creeps[creep.name].job = 'mine';
                    }
                }
            }     
            else
            {
                creep.moveTo(testFlag);
            }
        }
    }
}