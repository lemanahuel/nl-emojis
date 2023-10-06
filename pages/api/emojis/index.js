const SupabaseIntegration = require('../integrations/supabase')
const { MODALITIES_ALIAS } = require('../helpers')

export default async function handler (req, res) {
  let items = []

  try {
    items = await getEmojis()
    // items = await new SupabaseIntegration().select()
    // items.forEach(item => {
    //   const startDateAlias = new Date(item.startDate)
    //   item.startDateAlias = `${item.startDayAlias} ${startDateAlias.getDate()}/${startDateAlias.getMonth() + 1}/${startDateAlias.getFullYear()}`
    //   item.modality = MODALITIES_ALIAS[item.modality] || MODALITIES_ALIAS['no-data']
    // })
  } catch (err) {
    console.error('err-courses', err)
  }

  res.status(200).json(items)
}

async function getEmojis () {
  return await fetch('https://emoji-api.com/emojis?access_key=5f234ed41d475a77aa493ed2b4561a8a0531e4cc').then(r => r.json())
}

//