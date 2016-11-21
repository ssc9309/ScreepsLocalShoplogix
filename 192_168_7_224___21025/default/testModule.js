/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('testModule'); // -> 'a thing'
 */
 
module.exports = function(creep)
{
    creep.say("test");
    
    var testFlag = Game.flags.test;
    var building = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    
    
    if (building)
    {
        if(Memory.creeps[creep.name].job == 'mine')
        {
            if (creep.carry.energy < creep.carryCapacity)
            {
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                creep.moveTo(source);
                creep.harvest(source);
            }
            else
            {
                Memory.creeps[creep.name].job = 'build';
            }
        }
        else
        {
            if (creep.carry.energy > 0)
            {
                
                creep.moveTo(building);
                creep.build(building);
            }
            else
            {
                Memory.creeps[creep.name].job = 'mine';
            }
        }
    }     
    else
    {
        creep.moveTo(testFlag);
    }
}