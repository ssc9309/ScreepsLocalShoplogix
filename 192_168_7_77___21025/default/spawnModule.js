module.exports = function(spawnName, buildingMaxHealthVar)
{
	var startCPU = Game.cpu.getUsed();
	var spawn = Game.spawns[spawnName];
	
	var towerModule = require('towerModule');
    var towers = spawn.room.find(FIND_STRUCTURES, 
    {
        filter: 
        {
            structureType: STRUCTURE_TOWER, my: true
        }
    });
    
    towers.forEach(towerModule.run);

    //console.log("towerModules: " + parseInt((Game.cpu.getUsed() - startCPU)));
    startCPU = Game.cpu.getUsed();

    var linkModule = require('linkModule');
    var links = spawn.room.find(FIND_MY_STRUCTURES,
    {
    	filter: {structureType: STRUCTURE_LINK}
    });

    //links.forEach(linkModule.run);
    for (var i in links)
    {
    	linkModule(links[i], spawn);
    }

    //console.log("linkModules: " + parseInt((Game.cpu.getUsed() - startCPU)));
    startCPU = Game.cpu.getUsed();

    //kill off the lower level miner if the max can be built
    var minersVar = spawn.room.find(FIND_MY_CREEPS, 
    {
    	filter : function(object)
    	{
    		return object.memory.role == 'miner';
    	}
    });

    if (minersVar && minersVar.length >= spawn.room.memory.minerLimit)
    {
    	for (var i in minersVar)
    	{
    		var workBodyCount = 0;
    		for (var j in minersVar[i].body)
    		{
    			if (minersVar[i].body[j].type == WORK)
    			{
    				workBodyCount++;
    			}
    		}

    		if (workBodyCount < 6 && spawn.canCreateCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE]) == OK)
    		{
    			minersVar[i].suicide();
    			break;
    		}
    	}
    }

	//console.log("Limit Fixing: " + parseInt((Game.cpu.getUsed() - startCPU)));
    startCPU = Game.cpu.getUsed();


	//if it's not spawning, make sure spawn has all the creeps
	var keepUpCreepNumber = require('spawn_keepUpCreepNumber');

	if (!(spawn.spawning))
	{
		keepUpCreepNumber(spawn);
	}

	//console.log("keepUpCreepNumberModule: " + parseInt((Game.cpu.getUsed() - startCPU)));
    startCPU = Game.cpu.getUsed();
    
    
    //call range builder
    if (spawn.room.controller.level <= 4)
    {
        var constSites = spawn.room.find(FIND_CONSTRUCTION_SITES);

        if (constSites.length > 0)
        {
            Game.flags.rangeBuild.setPosition(spawn.room.controller.pos);
        }
    }
    
    
    
    
}
