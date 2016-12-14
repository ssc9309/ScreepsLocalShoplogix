/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('armyModule'); // -> 'a thing'
 */
 
 
 
//note: make a command flag

module.exports = function(creep)
{
    creep.say('A');
    
    if (creep.room.name == 'W3N7')
    {
        if (Game.time % 2 == 0)
        {
            creep.say('Hammer', true);
        }
        else
        {
            creep.say('DOWN!', true);
        }
    }
    
    var rallyFlag = Game.flags.rallyFlag;
    var cmdFlag = Game.flags.cmd;
    
    /*
    var hostilesCount = {};

    creep.room.find(FIND_HOSTILE_CREEPS, 
    {
        filter: function(i) 
        { 
            if(i.owner.username != 'Source Keeper') 
            {
                hostilesCount[i.owner.username] = hostilesCount[i.owner.username] || 0;
                hostilesCount[i.owner.username]++;
            }
        }
    });

    for(var user in hostilesCount) 
    {
        Game.notify(hostilesCount[user] + ' enemies spotted: user ' + user + ' in room ' + creep.room.name);
    }
    */
    
    
    var hostileCreep = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, 
    {
        filter: function(object)
        {
            //console.log(object.owner.username);
            return object.owner.username != 'Source Keeper';
        }
    });
    var moveResult = 0;
    var mySpawnInRoom = creep.room.find(FIND_MY_STRUCTURES,
    {
        filter: function (object)
        { 
            return object.structureType == STRUCTURE_SPAWN && !object.spawning;
        }
    });

    if (!hostileCreep && creep.memory.renew && mySpawnInRoom.length > 0)
    {
        var result = mySpawnInRoom[0].renewCreep(creep);
        
        if (rallyFlag.room && rallyFlag.room.name == mySpawnInRoom[0].room.name)
        {
            if(result == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(mySpawnInRoom[0]);
            }
            else if (result == ERR_FULL)
            {
                creep.memory.renew = false;
            }
        }
    }
    else if (creep.ticksToLive < 1400 && !creep.memory.renew)
    {
        creep.memory.renew = true;
        //console.log(mySpawnInRoom[0].renewCreep(creep) );
        //if(mySpawnInRoom[0].renewCreep(creep) == ERR_NOT_IN_RANGE)
        //{
            //creep.moveTo(mySpawnInRoom[0]);
        //}
    }
    //priorities cmd order first
    else if(cmdFlag)
    {
        //var cmdPos = creep.pos.look(cmdFlag);
        var cmdPos = cmdFlag.pos.look();
        
        for(var x in cmdPos)
        {
            //console.log(cmdPos[x].type + cmdPos[x].owner);
            if (cmdPos[x].type == 'structure')
            {
                //console.log("There is a structure");
                var cmdStructure = cmdPos[x].structure;
                //console.log(cmdStructure);
                //console.log(cmdStructure.structureType);
                
                //creep.attack(cmdStructure);
                if (creep.rangedAttack(cmdStructure) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(cmdStructure);
                }
            }
            else if (cmdPos[x].type == 'terrain')
            {
                //console.log("There is a Terrain");
                
                var cmdTerrain = cmdPos[x].terrain;
                
                //console.log(cmdTerrain);
            }
            else if (cmdPos[x].type == 'creep')
            {
                //console.log("There is a Terrain");
                
                var cmdCreep = cmdPos[x].creep;
                
                //console.log(cmdCreep);
            }
        }
    }
    else if(hostileCreep) 
    {
        creep.attack(hostileCreep);
        var result = creep.rangedAttack(hostileCreep);
        
        //creep.say(result);
        
        moveResult = creep.moveTo(hostileCreep);
        
        //if i see a creep, but can't move to it, there must be a structure in the way
        //destroy the closest rampart if you can
        if (moveResult == -2)
        {
            creep.say("Can't reach");
            var hostileRampart = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, 
            {
                filter: { structureType: STRUCTURE_RAMPART }
            });
            
            //destroy the rampart if you can
            if (hostileRampart)
            {
                creep.moveTo(hostileRampart);
                creep.attack(hostileRampart);
                creep.rangedAttack(hostileRampart);
            }
            else
            {
                var hostileWall = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, 
                {
                    filter: { structureType: STRUCTURE_WALL}
                });
                
                if (hostileWall)
                {
                    creep.say("Found wall");
                    creep.attack(hostileWall);
                    creep.rangedAttack(hostileWall);
                    creep.moveTo(hostileWall);
                }
            }
        }
    }
    else
    {
        //if there are no creeps, start destroying the spawns and buildings
        var hostileSpawn = creep.pos.findClosestByPath(FIND_HOSTILE_SPAWNS);
        //creep.say('no creep')
        
        if (hostileSpawn)
        {
            creep.moveTo(hostileSpawn);
            creep.attack(hostileSpawn);
            creep.rangedAttack(hostileSpawn);
        }
        else
        {
            var hostileStructure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
            //console.log(hostileStructure.structureType);
            if (hostileStructure && hostileStructure.structureType != 'controller')
            {
                creep.moveTo(hostileStructure);
                creep.attack(hostileStructure);
                creep.rangedAttack(hostileStructure);
            }
            //if there is no hostile spawn or structure, rally
            else
            {
                //creep.say('return');
                moveResult = creep.moveTo(rallyFlag);
                //creep.say(moveResult);
            }
        }
    }
}