/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('repairModule'); // -> 'a thing'
 */
 
module.exports = function(creep, maxHealth)
{
    creep.say("R");
    
    //var maxHealth = 200000;
    
    if (Memory.creeps[creep.name].job == 'collect')
    {
        if(creep.carry.energy < creep.carryCapacity)// && Room.energyAvailable > 500)// && Game.spawns.Spawn1.energy > 200) 
    	{
    	    if (creep.room.energyAvailable >= 300)
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
                    if (targetExt.transferEnergy(creep) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(targetExt);
                    }
                }
    	    }
    	    /*
    	    if (Game.spawns.Spawn1.energy == Game.spawns.Spawn1.energyCapacity)
    	    {
    		    creep.moveTo(Game.spawns.Spawn1);
    		    Game.spawns.Spawn1.transferEnergy(creep);
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
                    if (extension.energy == extension.energyCapacity)
                    {
                        creep.moveTo(extension);
    		            extension.transferEnergy(creep);
                    }
                }
    	    }
    	    */
    	}
    	else
    	{
    	    Memory.creeps[creep.name].job = 'repair';
    	}
    }
    else
    {
        
        if (creep.carry.energy > 0)
        {
            //priorities walls and ramparts first
            /*
            var targetStructure = creep.pos.findClosestByPath(FIND_STRUCTURES,
            {
                filter: function(object)
                {
                    //don't fix it if it's not mine
                    if(object.owner)
                    {
                        //console.log(object.owner);
                        return false;
                    }
                    else
                    {
                        //don't fix it if health is full
                        if (object.hits >= object.hitsMax)
                        {
                            return false;
                        }
                        else
                        {
                            //for walls and stuff, cap it at 1000000
                            if (object.hits >= 1000000)
                            {
                                return false;
                            }
                            else
                            {
                                //if it's blocked, skip it
                                //i can't do this, because the findClosestByPath does not stop at first true
                                
                                //var moveResult = creep.moveTo(object);
                                //if (moveResult == -2)
                                //{
                                    //return false;
                                //}
                                //else
                                //{
                                    //otherwise fix it
                                    return true;
                                //}
                            }
                        }
                    }
                    
                }
            });
            */
            //fix walls and ramparts first
            var targetStructure = creep.pos.findClosestByPath(FIND_STRUCTURES,
            {
                filter: function(object)
                {
                    if(object.structureType == STRUCTURE_RAMPART || object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_CONTAINER)
                    {
                        if (object.hits < object.hitsMax && object.hits < maxHealth)
                        {
                            return true;
                        }
                    }
                    return false;
                }
            });
            
            if (targetStructure)
            {
                if (creep.repair(targetStructure) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(targetStructure);
                }
            }
            else
            {
                //if there is no walls that need fixing, fix roads
                targetStructure = creep.pos.findClosestByPath(FIND_STRUCTURES,
                {
                    filter: function(object)
                    {
                        if (object.structureType == STRUCTURE_ROAD)
                        {
                            if (object.hits < object.hitsMax)
                            {
                                return true;
                            }
                        }
                        return false;
                    }
                });
                
                if (targetStructure)
                {
                    if (creep.repair(targetStructure) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(targetStructure);
                    }
                }
            }
        }
        else
        {
            Memory.creeps[creep.name].job = 'collect';
        }
    }
    
    
    //creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD);
}