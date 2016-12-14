module.exports = 
{
    run: function(tower) 
    {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        
        if(closestHostile) {
            tower.attack(closestHostile);
        }
        else
        {
            var closestDamagedCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS,
            {
                filter: function (object)
                {
                    return object.hits < object.hitsMax;
                }
            });
            if (closestDamagedCreep)
            {
                tower.heal(closestDamagedCreep);
            }
            else
            {
                var rampart = tower.pos.findClosestByRange(FIND_STRUCTURES,
                {
                   filter: function(object)
                   {
                       return (object.structureType == STRUCTURE_RAMPART) && 
                                object.hits < tower.room.memory.buildingMaxHealth;
                   }
                });
                if (rampart)
                {
                    tower.repair(rampart);
                }
                else
                {
                    var damagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES,
                    {
                        filter: function(object)
                        {
                            return (object.structureType == STRUCTURE_WALL && object.hits < object.hitsMax && object.hits < tower.room.memory.buildingMaxHealth) ||
                                    (object.structureType != STRUCTURE_WALL && object.hits < object.hitsMax);
                        }
                    });
                    if (damagedStructure)
                    {
                        tower.repair(damagedStructure);
                    }
                }
            }
        }
    }
};