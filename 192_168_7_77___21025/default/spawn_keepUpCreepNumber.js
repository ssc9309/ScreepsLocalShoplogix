module.exports = function(spawn)
{
	//var creepsOfSpawn = [];

	var transferCount = 0;
	var minerCount = 0;
	var truckCount = 0;
	var buildCount = 0;
	var upgradeCount = 0;
	var armyCount = 0;
	var controlCount = 0;
	var repairCount = 0;
	var testCount = 0;

	var bodyTypeToMake = '';
	var body = [];

	for(var name in Game.creeps)
	{
		var creepVar = Game.creeps[name];

		if (creepVar.memory.spawnRoom == spawn.room.name)
		{
			var creepRole = creepVar.memory.role;
			//console.log(creepRole);

		    if (creepRole == 'transfer')
			{
			    transferCount++;
			}	
			else if (creepRole == 'miner')
			{
			    minerCount++;
			}
			//trucks only pick up from miner, not from ground
			else if (creepRole == 'truck')
			{
			    truckCount++;
			}
			else if (creepRole == 'build')
			{
			    buildCount++;
			}
			else if (creepRole == 'upgrade')
			{
			    upgradeCount++;
			}
			else if (creepRole == 'army')
			{
			    armyCount++;
			}
			else if (creepRole == 'control')
			{
			    controlCount++;
			}
			else if (creepRole == 'repair')
			{
			    repairCount++;
			}
			else if (creepRole == 'test')
			{
			    testCount++;
			}
		}
	}

	//console.log(spawn.room.memory.truckLimit);

	var spawnMemory = spawn.room.memory;
	//console.log(transferCount);

	//this is priority list. IT DICTATES WHICH ONE TO BUILD FIRST
	if (transferCount < spawnMemory.transferLimit)
	{
		bodyTypeToMake = 'transfer';
	}
	else if (minerCount < spawnMemory.minerLimit)
	{
		bodyTypeToMake = 'miner';
	}
	else if (truckCount < spawnMemory.truckLimit)
	{
		bodyTypeToMake = 'truck';
	}
	else if (buildCount < spawnMemory.buildLimit)
	{
		bodyTypeToMake = 'build';
	}
	else if (upgradeCount < spawnMemory.upgradeLimit)
	{
		bodyTypeToMake = 'upgrade';
	}
	else if (repairCount < spawnMemory.repairLimit)
	{
		bodyTypeToMake = 'repair';
	}
	else if (armyCount < spawnMemory.armyLimit)
	{
		bodyTypeToMake = 'army';
	}
	//console.log(bodyTypeToMake);
	if (bodyTypeToMake != '')
	{
		var availableEnergy = spawn.room.energyAvailable;
		var energyCapacity = spawn.room.energyCapacityAvailable;
		var prevBody = [];

		do
		{
			//wow i learned something
			// = will reference. if the original is changed, so will the copy
			// _.clone() will take the value
			prevBody = _.clone(body);

			if (bodyTypeToMake == 'truck' || bodyTypeToMake == 'transfer')
			{	
				body.push(MOVE);
				body.push(CARRY);
			}
			else if(bodyTypeToMake == 'miner')
			{
				if (body.length == 0)
				{
					body.push(WORK, MOVE, CARRY);
				}
				else
				{
					//if max miner body is approved, stop
					if (body.length >= 8)
					{
						break;
					}
					else
					{
						body.push(WORK)
					}
				}
			}
			else if (bodyTypeToMake == 'build' || bodyTypeToMake == 'upgrade' || bodyTypeToMake == 'repair')
			{
				body.push(MOVE);
				body.push(CARRY);
				body.push(WORK);
			}
		}while(spawn.canCreateCreep(body) == OK);


		body = _.clone(prevBody);

		//console.log(body.length);

		if (body.length > 0)
		{
			spawn.createCreep(body, null, { role: bodyTypeToMake, spawnRoom: spawn.room.name});
		}
	}
}