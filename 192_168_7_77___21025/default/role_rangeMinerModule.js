/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('rangeMinerModule');
 * mod.thing == 'a thing'; // true
 */

module.exports = function(creep)
{
	var moveBodyCount = 0;
    for (var i in creep.body)
    {
        if (creep.body[i].type == MOVE)
        {
            moveBodyCount++;
        }
    }
    
    creep.say('RM_'+creep.memory.flagName);

    //if it doesn't have a flag. assign itself one
    if (!(creep.memory.flagName))
    {
    	var unassignedRangeMineFlagsForRoom = [];

    	for(var name in Game.flags)
    	{
    		var flagVar = Game.flags[name];

    		//if it's a mining flag
    		if (flagVar.color == COLOR_YELLOW)
    		{
    			//for the same room
    			if (flagVar.memory.spawnRoom && flagVar.memory.spawnRoom == creep.memory.spawnRoom)
	    		{
	    		    
	    			//doesn't have a miner or miner is dead
	    			if (!(flagVar.memory.creepName) || (!Game.creeps[flagVar.memory.creepName]) || flagVar.memory.creepName == creep.name || (Game.creeps[flagVar.memory.creepName] && Game.creeps[flagVar.memory.creepName].memory.role != 'rangeMiner'))
	    			{
	    				flagVar.memory.creepName = creep.name;
	    				creep.memory.flagName = flagVar.name;
	    				break;
	    			}
	    		}
    		}
    	}
    }

    //if it still doesn't have a flag. too many miners
    if (!(creep.memory.flagName))
    {
    	console.log('No Empty rangeMinerFlag');
    }
    //if the creep has a flag
    else
    {
        var flagVar = Game.flags[creep.memory.flagName];
    	//if i know the source id, then go to it and mine
    	if (creep.memory.sourceID)
    	{
    	    if (flagVar.room && flagVar.room.controller.owner && !flagVar.room.controller.my)
    	    {
                //console.log(flagVar.room.controller.owner.username);
                //hank, here too. i can't make a new flag...
    	        //Game.flags.safeModeCheckFlag.setPosition(new RoomPosition(flagVar.room.controller.pos.x, flagVar.room.controller.pos.y, flagVar.room.name));
    	        //Game.rooms[creep.memory.spawnRoom].memory.safeModeCheckerLimit = 1;
    	        //flagVar.remove();
    	    }
    	    
    		var sourceVar = Game.getObjectById(creep.memory.sourceID);

            //hahahah. you cna't mine in someone else's room
            //console.log(creep.harvest(sourceVar));
    		if (creep.harvest(sourceVar) == ERR_NOT_IN_RANGE)
    		{
    			//console.log("I am an idiot");
    			creep.moveTo(sourceVar);	
    		}
    		if (creep.carry >= creep.carryCapacity)
    		{
    			creep.drop(RESOURCE_ENERGY);
    		}
    	}
    	//if i don't know the source id, assign myself one
    	else
    	{
	    	//if flag is in the different room
	    	//console.log(creep.name + flagVar.room);
	    	if (!(flagVar.room) || flagVar.room.name != creep.room.name)
	    	{
	    		creep.moveTo(flagVar);
	    	}
	    	else
	    	{
	    		var sourcesVar = creep.room.find(FIND_SOURCES);
	    		for (var i in sourcesVar)
	    		{
	    			//console.log(sourcesVar[i].pos.x);
	    			if (sourcesVar[i].pos.x == flagVar.pos.x && sourcesVar[i].pos.y == flagVar.pos.y)
	    			{
	    				creep.memory.sourceID = sourcesVar[i].id;
	    				break;
	    			}
	    		}
	    	}
    	}
    }
    
    //fuck you invaders
    var hostileCreeps = creep.room.find(FIND_HOSTILE_CREEPS);
    if (hostileCreeps.length > 0)
    {
        Game.flags.rallyFlag.setPosition(new RoomPosition(hostileCreeps[0].pos.x, hostileCreeps[0].pos.y, creep.room.name));
    }
    else
    {
        if (Game.flags.rallyFlag && Game.flags.rallyFlag.room && Game.flags.rallyFlag.room.name == creep.room.name && Game.flags.rallyFlag.room.name != creep.memory.spawnRoom)
        {
            Game.flags.rallyFlag.setPosition(new RoomPosition(25, 25, creep.memory.spawnRoom));
        }
    }
    //console.log(hostileCreeps.length);
};