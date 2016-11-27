/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('transferModule'); // -> 'a thing'
 */
 
module.exports = function(creep)
{
    creep.say('Tf');
    if (Memory.creeps[creep.name].job == 'collect')
    {
        if (creep.carry.energy < creep.carryCapacity)
        {
            for(var s in Game.structures)
            {
                if (Game.structures[s].structureType == 'storage')
                {
                    var storage = Game.structures[s];

                    if (storage.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(storage);
                    }
                    break;
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
            /*
            if (Game.spawns.Spawn1.energy < Game.spawns.Spawn1.energyCapacity)
	        {
		        creep.moveTo(Game.spawns.Spawn1);
		        creep.transferEnergy(Game.spawns.Spawn1)
	        }
	        else
	        {
	            var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, 
                {
                    filter: { structureType: STRUCTURE_EXTENSION }
                });
            
                for(var x in extensions)
                {
                    var extension = extensions[x];
                    if (extension.energy < extension.energyCapacity)
                    {
                        creep.moveTo(extension);
	                    creep.transferEnergy(extension);
	                    break;
                    }
                }
    	    }
    	    */
    	    
            //fill up the extension and spawn first
    	    var targetExt = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
            {
                filter: function(object)
                {
                    return (object.structureType == STRUCTURE_EXTENSION || object.structureType == STRUCTURE_SPAWN) && (object.energy < object.energyCapacity);
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