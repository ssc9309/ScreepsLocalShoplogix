/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('truckModule'); // -> 'a thing'
 */
 
module.exports = function(creep)
{
    creep.say('T');

    //similar to miner, assign a number
    if (Memory.creeps[creep.name].number != 0 && Memory.creeps[creep.name].number != 1)
    {
        //find the untaken resource and assign
        //var resourceZeroFound = false;
        //var resourceOneFound = false;
        
        var resourceZeroCounter = 0;
        var resourceOneCounter = 0;
        
        for (var name in Game.creeps)
        {
            if (Memory.creeps[name].role == 'truck')
            {
                if (Memory.creeps[name].number == 0)
                {
                    //resourceZeroFound = true;
                    resourceZeroCounter++;
                }
                else if (Memory.creeps[name].number == 1)
                {
                    //resourceOneFound = true;
                    resourceOneCounter++;
                }
            }
        }
        
        /*
        if (resourceZeroCounter == 0)
        {
            Memory.creeps[creep.name].number = 0;
        }
        else if (resourceOneCounter == 0)
        {
            Memory.creeps[creep.name].number = 1;
        }
        */
        if (resourceZeroCounter <= resourceOneCounter)
        {
            Memory.creeps[creep.name].number = 0;
        }
        else
        {
            Memory.creeps[creep.name].number = 1;
        }
        
        /*
        if(!resourceZeroFound)
        {
            Memory.creeps[creep.name].number = 0;
        }
        else if(!resourceOneFound)
        {
            Memory.creeps[creep.name].number = 1;
        }
        */
    }
    else
    {
        //equalize the number of trucks
        var resourceZeroCounter = 0;
        var resourceOneCounter = 0;
        
        for (var name in Game.creeps)
        {
            if (Memory.creeps[name].role == 'truck')
            {
                if (Memory.creeps[name].number == 0)
                {
                    resourceZeroCounter++;
                }
                else if (Memory.creeps[name].number == 1)
                {
                    resourceOneCounter++;
                }
            }
        }
        
        //if the difference is greater than 1, transfer one over
        if (Math.abs(resourceOneCounter - resourceZeroCounter) > 1)
        {
            //console.log("Difference is greater than 1");
            //console.log(resourceOneCounter);
            if (resourceOneCounter > resourceZeroCounter)
            {
                for (var name in Game.creeps)
                {
                    if (Memory.creeps[name].role == 'truck')
                    {
                        if (Memory.creeps[name].number == 1)
                        {
                            Memory.creeps[name].number = 0;
                            break;
                        }
                    }
                }
            }
            else
            {
                //console.log("I should be here");
                for (var name in Game.creeps)
                {
                    if (Memory.creeps[name].role == 'truck')
                    {
                        if (Memory.creeps[name].number == 0)
                        {
                            Memory.creeps[name].number = 1;
                            break;
                        }
                    }
                }
            }
        }
    }
    
    //find the correct miner creep
    var minerCreep = null;
    for (var name in Game.creeps)
    {
        if (Memory.creeps[name].role == 'miner' && Memory.creeps[name].number == Memory.creeps[creep.name].number)
        {
            minerCreep = Game.creeps[name];
            break;
        }
    }
    
    //if the minercreep is found
    if (minerCreep != null)
    {
        //creep.say(minerCreep.name);
        //creep.say(Memory.creeps[creep.name].job);
        if (Memory.creeps[creep.name].job == 'collect')
        {
            //collect until full
            
            if (creep.carry.energy < creep.carryCapacity)
            {
                var droppedEnergyTarget = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
                
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
                
                /*
                var transferResult = 
                if (transferResult == OK)
                {
                    
                    
                }
                */
            }
            else
            {
                Memory.creeps[creep.name].job = 'distribute';
            }
        }
        else
        {
            //distribute until empty
            
            if (creep.carry.energy > 0)
            {
            //   if (Game.spawns.Spawn1.energy < Game.spawns.Spawn1.energyCapacity)
	        //    {
		  //          creep.moveTo(Game.spawns.Spawn1);
		  //          creep.transferEnergy(Game.spawns.Spawn1)
	        //    }
	        //    else
	        //    {
	                //fill all extensions first, then storage
	                //var isExtensionsFull = true;
	                
	                /*
	                var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, 
	                {
                        filter: { structureType: STRUCTURE_EXTENSION }
                    });
            
                    for(var x in extensions)
                    {
                        var extension = extensions[x];
                        if (extension.energy < extension.energyCapacity)
                        {
                            isExtensionsFull = false;
                            creep.moveTo(extension);
		                    creep.transferEnergy(extension);
                        }
                    }
                    */
                    
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
                    else
                    //if (isExtensionsFull)
                    {
                        for (var name in Game.structures)
                        {
                            if (Game.structures[name].structureType == 'storage')
                            {
                                var storage = Game.structures[name];
                                
                                if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                                {
                                    creep.moveTo(storage);
                                }
                            }
                        }
                    }
        	//    }
            }
            else
            {
                Memory.creeps[creep.name].job = 'collect';
            }
        }
    }
    
    //and drop a road
    //creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD);
    
}