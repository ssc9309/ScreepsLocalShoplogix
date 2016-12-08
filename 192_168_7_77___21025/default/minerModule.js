/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('minerModule'); // -> 'a thing'
 */
 
module.exports = function(creep)
{
    var workBodyCount = 0;
    for (var i in creep.body)
    {
        if (creep.body[i].type == WORK)
        {
            workBodyCount++;
        }
    }
    
    creep.say('M'+workBodyCount);
     
     //creep.say(Memory.creeps[creep.name].role);
     
    var resources = creep.room.find(FIND_SOURCES);//[Memory.creeps[creep.name].number];
    //console.log(resources);
    
    //creep.say(Memory.creeps[creep.name].number);
    //creep.say()
    
    if (creep.carry.energy < creep.carryCapacity || creep.carry.energy == 0)
    {
        //creep.moveTo(resources[0]);
        if (creep.harvest(resources[Memory.creeps[creep.name].number]) == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(resources[Memory.creeps[creep.name].number]);
        }
    }
    
    if (creep.carry.energy >= creep.carryCapacity)
    {
        creep.drop(RESOURCE_ENERGY);
    }
    
    //else
    //{
        //creep.dropEnergy();
    //}
}