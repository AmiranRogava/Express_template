

export async function test(req, res) {
    try {
        const { data } = req.body
        res.json(data )

    } catch (err) {
        console.error("error while testing")
        res.status(500).json({ error: 'Internal server Error' })
    }
}

export default {
    test
}