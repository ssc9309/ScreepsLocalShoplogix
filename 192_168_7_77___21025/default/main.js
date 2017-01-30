var transferModule = require('role_transferModule');
var minerModule = require('role_minerModule');
var truckModule = require('role_truckModule');
var buildModule = require('role_buildModule');
var upgradeModule = require('role_upgradeModule');
var armyModule = require('role_armyModule');
var controlModule = require('role_controlModule');
var repairModule = require('role_repairModule');
var rangeBuilderModule = require('role_rangeBuilderModule');
var rangeMinerModule = require('role_rangeMinerModule');
var rangeTruckModule = require('role_rangeTruckModule');
var healerModule = require('role_healerModule');
var tankModule = require('role_tankModule');
var safeModeCheckerModule = require('role_safeModeCheckerModule');
var mineralHarvesterModule = require('role_mineralHarvesterModule');
var mineralTransferModule = require('role_mineralTransferModule'); 

var spawnModule = require('spawnModule');

module.exports.loop = function()
{
    var allSpawns = Game.spawns;
    var startCPU = Game.cpu.getUsed();
    
    //clean up memory
    for(var name in Memory.creeps)
    {
        if (!Game.creeps[name])
        {
            delete Memory.creeps[name];
        }
    }
    
    //console.log("---SpawnModule Start---");
    for (var spawnName in allSpawns)
    {
    	spawnModule(spawnName);
    }
    //console.log("---SpawnModuleTotal: " + parseInt((Game.cpu.getUsed() - startCPU)) + "---");
    startCPU = Game.cpu.getUsed();
    //console.log("---CreepModulesStart---");
     
    //activate the creeps
    for(var name in Game.creeps)
    {
        var creep = Game.creeps[name];
        var creepRole = creep.memory.role;
    
        if (creepRole == 'miner')
        {
            //console.log(creep.memory.role);
            minerModule(creep);
        }
        else if (creepRole == 'truck')
        {
            truckModule(creep);
        }
        else if (creepRole == 'build')
        {
            buildModule(creep);
        }
        else if (creepRole == 'upgrade')
        {
            upgradeModule(creep);
        }
        else if (creepRole == 'army')
        {
            armyModule(creep);
        }
        else if (creepRole == 'transfer')
        {
            transferModule(creep);
        }
        else if (creepRole == 'control')
        {
            controlModule(creep);
        }
        else if (creepRole == 'repair')
        {
            repairModule(creep, buildingMaxHealth);
        }
        else if (creepRole == 'test')
        {
            testModule(creep);
        }
        else if (creepRole == 'rangeBuilder')
        {
            rangeBuilderModule(creep);
        }
        else if (creepRole == 'rangeMiner')
        {
            rangeMinerModule(creep);
        }
        else if (creepRole == 'rangeTruck')
        {
            rangeTruckModule(creep);
        }
        else if (creepRole == 'healer')
        {
            healerModule(creep);
        }
        else if (creepRole == 'tank')
        {
            //tankModule(creep);
            armyModule(creep);
        }
        else if (creepRole == 'fastCat')
        {
            //tankModule(creep);
            armyModule(creep);
        }
        else if (creepRole == 'safeModeChecker')
        {
            safeModeCheckerModule(creep);
        }
        else if (creepRole == 'mineralHarvester')
        {
            mineralHarvesterModule(creep);
        }
        else if (creepRole == 'mineralTransfer')
        {
            mineralTransferModule(creep);
        }
    }
    
    //console.log("---CreepModulesTotal: " + parseInt((Game.cpu.getUsed() - startCPU)) + "---");
    startCPU = Game.cpu.getUsed();
    
    
    for (var name in Game.flags)
    {
        var flag = Game.flags[name];
        
        if (flag.color == COLOR_YELLOW)
        {
            if (!flag.memory.spawnRoom)
            {
                flag.memory.spawnRoom = 'WINJ';
            }
        }
        else if (name == 'rangeBuild')
        {
            //console.log("Hello");

        }
        else if (name == 'nuke')
        {
            var nukerVar = Game.spawns.Spawn1.pos.findClosestByPath(FIND_MY_STRUCTURES,
            {
                filter: function(object)
                {
                    return object.structureType == STRUCTURE_NUKER && object.cooldown <= 0;
                }
            });
            
            if (nukerVar)
            {
                nukerVar.launchNuke(flag.pos);
                flag.remove();
            }
            else
            {
                nukerVar = Game.spawns.Spawn2.pos.findClosestByPath(FIND_MY_STRUCTURES,
                {
                    filter: function(object)
                    {
                        return object.structureType == STRUCTURE_NUKER && object.cooldown <= 0;
                    }
                });
                if (nukerVar)
                {
                    nukerVar.launchNuke(flag.pos);
                    flag.remove();
                }
                else
                {
                    //console.log("All nukers are on cooldown");
                }
            }
        }
    } 
    
    //console.log("Flags: " + parseInt((Game.cpu.getUsed() - startCPU)));
    startCPU = Game.cpu.getUsed();
    //console.log();

    for (var name in Game.rooms)
    {
        var terminalFromVar = Game.rooms[name].terminal;

        if(terminalFromVar)
        {
            var nukerFromVar = terminalFromVar.room.find(FIND_MY_STRUCTURES, 
            {
                filter: function(object)
                {
                    return object.structureType == STRUCTURE_NUKER && object.ghodium < object.ghodiumCapacity;
                }
            });
            //Donate energy to Low Level Low Energy room
            if (terminalFromVar.room.controller.level >= 8 && terminalFromVar.store[RESOURCE_ENERGY] >= terminalFromVar.storeCapacity * 0.1) 
            {
                //console.log(terminalVar.room.name);
                for(var name2 in Game.rooms)
                {
                    var terminalToVar = Game.rooms[name2].terminal;
                    if (terminalToVar && terminalToVar.room.controller.level < 8 && terminalToVar.store[RESOURCE_ENERGY] < terminalToVar.storeCapacity * 0.1)
                    {
                        var costFactor = Math.log(0.1 * Game.map.getRoomLinearDistance(terminalToVar.room.name, terminalFromVar.room.name) + 0.9) + 0.1 + 1;
                        var sendAmount = Math.floor((terminalToVar.storeCapacity * 0.1 - terminalToVar.store[RESOURCE_ENERGY]) / costFactor);

                        if (sendAmount < 100)
                        {
                            sendAmount = 100;
                        }

                        console.log("Terminal Result: " + terminalFromVar.send(RESOURCE_ENERGY, sendAmount, terminalToVar.room.name));
                        console.log("From: " + terminalFromVar.room.name);
                        console.log("To: " + terminalToVar.room.name);
                        console.log("Sent: " + sendAmount);
                        //
                        //console.log("Factor: " + costFactor);
                        break; 
                    }
                }
            }
            //handout ghodium to the rooms with nuker but low energy
            else if (nukerFromVar.length <= 0 && terminalFromVar.store[RESOURCE_GHODIUM] >= 5000)
            {
                for(var name2 in Game.rooms)
                {
                    var terminalToVar = Game.rooms[name2].terminal;
                    if (terminalToVar)// && terminalToVar.room.controller.level < 8 && terminalToVar.store[RESOURCE_ENERGY] < terminalToVar.storeCapacity * 0.1)
                    {
                        var nukerToVar = terminalToVar.room.find(FIND_MY_STRUCTURES,
                        {
                            filter: function(object)
                            {
                                return object.structureType == STRUCTURE_NUKER && object.ghodium < object.ghodiumCapacity;
                            }
                        });
                        
                        if (nukerToVar.length > 0 && (!terminalToVar.store[RESOURCE_GHODIUM] || terminalToVar.store[RESOURCE_GHODIUM] < 5000))
                        {
                            var sendAmount = 5000;
                            if (terminalToVar.store[RESOURCE_GHODIUM] < 5000)
                            {
                                sendAmount = 5000 - terminalToVar.store[RESOURCE_GHODIUM];
                            }
                            
                            if (terminalFromVar.store[RESOURCE_ENERGY] >= Game.market.calcTransactionCost(sendAmount, terminalFromVar.room.name, terminalToVar.room.name))
                            {
                                console.log("Ghodium Terminal Result: " + terminalFromVar.send(RESOURCE_GHODIUM, sendAmount, terminalToVar.room.name));
                                console.log("From: " + terminalFromVar.room.name);
                                console.log("To: " + terminalToVar.room.name);
                                console.log("Sent: " + sendAmount);
                            }
                        }
                    }
                }
            }
            else if (terminalFromVar.room.name != 'W8N8')
            {
                var mineralResourceType = terminalFromVar.room.find(FIND_MINERALS)[0].mineralType;
                var terminalToVar = Game.rooms['W8N8'].terminal;
                var sendAmount = 0;
                //console.log(terminalFromVar.store[mineralResourceType] >= 3000 - terminalToVar.store[mineralResourceType]);
                //if ((terminalToVar.store[mineralResourceType] === undefined || terminalToVar.store[mineralResourceType] < 3000) 
                    //&& terminalFromVar.store[mineralResourceType] >= 3000 - terminalToVar.store[mineralResourceType])
                if ((terminalToVar.store[mineralResourceType] === undefined && terminalFromVar.store[mineralResourceType] >= 3000) ||
                    terminalToVar.store[mineralResourceType] < 3000 && terminalFromVar.store[mineralResourceType] >= 3000 - terminalToVar.store[mineralResourceType])
                {
                    sendAmount = terminalToVar.store[mineralResourceType] === undefined ? 3000 : 3000 - terminalToVar.store[mineralResourceType];
                    if (terminalFromVar.store[RESOURCE_ENERGY] >= Game.market.calcTransactionCost(sendAmount, terminalFromVar.room.name, terminalToVar.room.name))
                    {
                        console.log(mineralResourceType + " Terminal Result: " + terminalFromVar.send(mineralResourceType, sendAmount, terminalToVar.room.name));
                        console.log("From: " + terminalFromVar.room.name);
                        console.log("To: " + terminalToVar.room.name);
                        console.log("Sent: " + sendAmount);
                    }
                    
                }

            }


/*
            var storageVar = Game.rooms[name].storage;

            if (terminalVar.store[RESOURCE_ENERGY] >= terminalVar.storeCapacity * 0.1)
            {
                if (storageVar.store[RESOURCE_ENERGY] < storageVar.storeCapacity / 2)
                {

                }
            }
            */
        }
    }
}