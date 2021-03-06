/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('rangeTruckModule');
 * mod.thing == 'a thing'; // true
 */

module.exports = function(creep)
{
	//creep.say('RT' + creep.body.length/2);

    var creepMemory = creep.memory;
    creep.say('RT_' + creepMemory.flagName);

    //if i don't have a minerCreep, assign myself to one
    if (!(creep.memory.minerName))
    {
    	for (var name in Game.creeps)
    	{
    		var creepVar = Game.creeps[name];
    		if (creepVar.memory.spawnRoom == creep.memory.spawnRoom)
    		{
    			if (creepVar.memory.role == 'rangeMiner')
    			{
    				if (!(creepVar.memory.truckName) || !(Game.creeps[creepVar.memory.truckName]))
    				{
    					creepVar.memory.truckName = creep.name;
    					creep.memory.minerName = creepVar.name;
    					creep.memory.flagName = creepVar.memory.flagName;
    					break;
    				}
    			}
    		}
    	}
    }

    //if still no miner, then not enough rangeMiner
    if (!(creep.memory.minerName))
    {
        //meh. most likely a dead miner
    	//console.log('No range miner to assign to');
    }
    else
    {
        if (creepMemory.job == 'collect')
        {
        	if (creep.carry.energy < creep.carryCapacity)
        	{
        		var minerCreep = Game.creeps[creep.memory.minerName];
        		//if your lover died... FIND A GODDAMN NEW ONE
        		if (!(minerCreep))
        		{
        			creepMemory.minerName = undefined;
        		}
        		//if in the same room, just pick up the dropped energy
        		else if (minerCreep.room.name == creep.room.name)
        		{
        			var droppedEnergyTarget = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY,
                    {
                        filter: function(object)
                        {
                            return (object.energy >= creep.carryCapacity && object.room.name == creep.room.name) ||
                                    (Math.abs(object.pos.x - creep.pos.x) <= 1 && Math.abs(object.pos.y - creep.pos.y) <= 1);
                        }
                    });
    
                    if (droppedEnergyTarget)
                    {
                        if (creep.pickup(droppedEnergyTarget) == ERR_NOT_IN_RANGE)
                        {
                            creep.moveTo(droppedEnergyTarget);
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
        		else
        		{
        			creep.moveTo(minerCreep);
        		}
        	}
        	else
        	{
        	    creepMemory.job = 'distribute';
        	}
        }
    	else
    	{
    	    if (creep.carry.energy > 0)
    	    {
        		//if i don't have a storage id, assignmyself one
        		if (!(creep.memory.storageID))
        		{
        			for (var name in Game.structures)
        			{
        				var structureVar = Game.structures[name];
        				if (structureVar.structureType == STRUCTURE_STORAGE && structureVar.room.name == creepMemory.spawnRoom)
        				{
        					creep.memory.storageID = structureVar.id;
        					break;
        				}
        			}
        		}
        		else
        		{
        		    var lookStructures = creep.room.lookForAt(LOOK_STRUCTURES, creep.pos);
        		    if (lookStructures.length == 1 && lookStructures[0].structureType == STRUCTURE_ROAD && lookStructures[0].hits < lookStructures[0].hitsMax)
        		    {
        		        creep.repair(lookStructures[0]);
        		    }
        		    else
        		    {
        		        var storageVar = Game.getObjectById(creepMemory.storageID);

                        if(storageVar.room.name != creep.room.name)
                        {
                            creep.moveTo(storageVar)
                        }
                        else
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
                            {
                                if (creep.transfer(storageVar, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                                {
                                    creep.moveTo(storageVar);
                                }
                            }
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
};