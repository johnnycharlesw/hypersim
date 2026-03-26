import { StatesOfMatter } from "../objects/models/StatesOfMatter.js";

export const MatterStateCollisionRules: Record<StatesOfMatter, Record<StatesOfMatter, boolean>> {
    [StatesOfMatter.Solid]: {
        [StatesOfMatter.Solid]: true, // Solids collide with each other
        [StatesOfMatter.Liquid]: true, // Solids block liquids
        [StatesOfMatter.Gas]: false, // Solids don't collide with gas
        [StatesOfMatter.BoseEinsteinCondensate]: true, // Solids can collide with them
        [StatesOfMatter.Plasma]: false, // It would surely evaporate
    },
    [StatesOfMatter.Liquid]: {
        [StatesOfMatter.Solid]: true, // Water can soak itself into solids
        [StatesOfMatter.Liquid]: true, // Water can mix with other liquids
        [StatesOfMatter.Gas]: false, // Water doesn't mix with air (unless you evaporate it, but then that's a whole different story)
        [StatesOfMatter.BoseEinsteinCondensate]: true, // Oobleck can be a liquid in some scenarios
        [StatesOfMatter.Plasma]: false, // It would evaporate
    },
    [StatesOfMatter.Gas]: {
        [StatesOfMatter.Solid]: false, // Air does not soak itself into solids like water
        [StatesOfMatter.Liquid]: false, // Air does not mix with liquids
        [StatesOfMatter.Gas]: false, // Gases pass through everything
        [StatesOfMatter.Plasma]: false,
        [StatesOfMatter.BoseEinsteinCondensate]: false,
    },
    [StatesOfMatter.BoseEinsteinCondensate]: {
        [StatesOfMatter.Solid]: true, // Oobleck is sometimes a solid and solids collide with solids
        [StatesOfMatter.Liquid]: true, // Oobleck is also sometimes a liquid and liquids mix
        [StatesOfMatter.Gas]: false, // However, it is never a gas
        [StatesOfMatter.BoseEinsteinCondensate]: true,
        [StatesOfMatter.Plasma]: true,
    }
    [StatesOfMatter.Plasma]: {
        [StatesOfMatter.Solid]: true,
        [StatesOfMatter.Liquid]: true,
        [StatesOfMatter.Gas]: true,
        [StatesOfMatter.Plasma]: true,
        [StatesOfMatter.BoseEinsteinCondensate]: true
    }
}