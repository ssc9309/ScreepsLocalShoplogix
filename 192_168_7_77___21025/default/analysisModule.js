/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('analysisModule'); // -> 'a thing'
 */

module.exports = function(spawnBuilding)
{
    //init
    var analysisCounter = 1;
    
    var creep = Game.creeps["Henry"];
    
    //console.log(Memory.spawns[spawnBuilding.name]);//.analysisCounter = analysisCounter;
    //Memory.creeps[name].role = 'transfer';
    
    Memory.creeps[creep.name].analysisCounter = analysisCounter;
    
    if (Memory.creeps[creep.name].analysisCounter)
    {
        analysisCounter = Memory.creeps[creep.name].analysisCounter;
    }
    else
    {
        Memory.creeps[creep.name].analysisCounter = analysisCounter;
    }
    
    //console.log(analysisCounter);
    console.log(Memory.creeps[creep.name].analysisCounter);
    
    var storageBuildings = spawnBuilding.room.find(FIND_MY_STRUCTURES,
    {
        filter: {structureType: STRUCTURE_STORAGE}
    });
    
    for(var a in storageBuildings)
    {
        //console.log(storageBuildings);
        //console.log(a);
        //console.log(storageBuildings[a].store.energy);
    }
     
}