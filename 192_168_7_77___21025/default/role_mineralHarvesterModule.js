/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role_mineralHarvesterModule');
 * mod.thing == 'a thing'; // true
 */

module.exports = function(creep)
{
	creep.say("MH");

    var creepMemory = creep.memory;

	if (!creepMemory.sourceID)
    {
        var mineralVar = creep.room.find(FIND_MINERALS)[0];

        creepMemory.sourceID = mineralVar.id;
    }
    else if (!creepMemory.extractorID)
    {
        var extractorVar = creep.room.find(FIND_MY_STRUCTURES, 
        {
            filter : function(object)
            {
                return object.structureType == STRUCTURE_EXTRACTOR;
            }
        });

        if (extractorVar.length > 0)
        {
            creepMemory.extractorID = extractorVar[0].id;
        }
    }
    else
    {
        if (creepMemory.job == 'collect')
        {
            //collect until full
            //console.log(creep.name);
            if (_.sum(creep.carry) < creep.carryCapacity)
            {
                var mineralVar = Game.getObjectById(creepMemory.sourceID);
                var extractorVar = Game.getObjectById(creepMemory.extractorID);
                var droppedResource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, 
                {
                    filter: function(object)
                    {
                        return object.resourceType == mineralVar.mineralType;
                    }
                });

                if (droppedResource)
                {
                    if (creep.pickup(droppedResource) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(droppedResource);
                    }
                }
                else
                {
                    if (extractorVar.cooldown > 0)
                    {
                        creep.moveTo(extractorVar);
                    }
                    else if (creep.harvest(mineralVar) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(extractorVar);
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
            
            if (_.sum(creep.carry) > 0)
            {
                var terminalVar = creep.room.terminal;
                
                if (terminalVar)
                {
                    //if (creep.transfer(terminalVar, ))
                    //console.log(Object.keys(creep.carry)[0]);

                    for (var key in Object.keys(creep.carry))
                    {
                        var fooType = Object.keys(creep.carry)[key];

                        if (creep.carry[fooType] <= 0)
                        {
                            continue;
                        }
                        else
                        {
                            //console.log(creep.transfer(fooType, terminalVar));
                            if (creep.transfer(terminalVar, fooType) == ERR_NOT_IN_RANGE)
                            {
                                creep.moveTo(terminalVar);
                                break;
                            }
                        }
                        
                        //creep.transfer(objec)
                        //console.log(Object.keys(creep.carry[RESOURCE_ZYNTHIUM]);
                    }


                    /*
                    creep.carry.forEach(function(object)
                    {
                        console.log(object);
                    });
                    */
                }
            }
            else
            {
                creepMemory.job = 'collect';
            }
        }
    }
};