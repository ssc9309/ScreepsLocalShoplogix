module.exports = function(link, spawn)
{
    /*
    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => structure.hits < structure.hitsMax
    });
    if(closestDamagedStructure) {
        tower.repair(closestDamagedStructure);
    }

    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(closestHostile) {
        tower.attack(closestHostile);
    }

    var closestDamagedCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS,
    {
        filter: (object) => object.hits < object.hitsMax
    });
    if (closestDamagedCreep)
    {
        tower.heal(closestDamagedCreep);
    }
    */

    //console.log(link.pos.x);
    if (spawn.room.memory.linkX === undefined || spawn.room.memory.linkY === undefined)
    {
        console.log("I need the link position");
    }
    else
    {
        var memoryX = spawn.room.memory.linkX;
        var memoryY = spawn.room.memory.linkY;
        //i am not the receiving link
        if (link.pos.x != memoryX && link.pos.y != memoryY)
        {
            var linkTo = spawn.room.lookForAt('structure', memoryX, memoryY)[0];

            if (linkTo)
            {
                link.transferEnergy(linkTo);
            }
            else
            {
                console.log("There is no link at the spot");
            }
        }
    }
}