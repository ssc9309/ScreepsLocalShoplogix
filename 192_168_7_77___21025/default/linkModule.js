module.exports = function(link, spawn)
{
    var memoryX = spawn.room.memory.linkX;
    var memoryY = spawn.room.memory.linkY;
    if (memoryX === undefined || memoryY === undefined || 
        memoryX < 0 || memoryY < 0)
    {
        console.log("I need the link position");
    }
    else
    {
        //i am not the receiving link
        if (link.pos.x != memoryX && link.pos.y != memoryY)
        {
            var linkTo = spawn.room.lookForAt('structure', memoryX, memoryY)[0];

            if (!(linkTo))
            {
                console.log("There is no link at the spot");
            }
            else if (link.energy >= (linkTo.energyCapacity - linkTo.energy))
            {
                link.transferEnergy(linkTo);
            }
        }
    }
}