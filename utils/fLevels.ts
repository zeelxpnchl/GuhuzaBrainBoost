import prisma from "@/lib/prisma"

async function fetchLevels() {
    try {
        const levels = await prisma.level.findMany({ 
            orderBy : { 
                Level_Id : 'desc'
            }
        });
        return levels

    } catch (e) {
        console.error(e)
    }
}

export default fetchLevels