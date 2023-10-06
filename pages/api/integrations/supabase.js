const {
  NEXT_PUBLIC_SUPABASE_URL = 'https://ppbkwzrcegulelgclcrl.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwYmt3enJjZWd1bGVsZ2NsY3JsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NTc2OTE1NCwiZXhwIjoxOTgxMzQ1MTU0fQ.kES6kz3W7Sj4WTiupX0Mbn7kvI4UmHR-74X00utiElY'
} = process?.env
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)

module.exports = class SupabaseIntegration {

  async insert (item) {
    try {
      const { data, error, statusText } = await supabase.from('courses').insert(item)
      if (!data || error) throw statusText || error
      return data
    } catch (err) {
      console.error('err-insert', { item, err })
      throw err
    }
  }

  async select () {
    try {
      const fromDate = `${new Date().toISOString().split('T')[0]} 00:00:00`
      const { data, error, statusText } = await supabase.from('courses').select('*')
        .gte('startDate', fromDate)
        .order('startDate')
      if (!data || error) throw statusText || error
      return data || []
    } catch (err) {
      console.error('err-select', err)
      throw err
    }
  }

  async selectOne (key, value) {
    try {
      const { data, error, statusText } = await supabase.from('courses').select('*').eq(key, value).limit(1)
      if (!data || error) throw statusText || error
      return data && data[0]
    } catch (err) {
      console.error('err-selectOne', { key, value, err })
      throw err
    }
  }

  async update (id, item) {
    try {
      const { data, error, statusText } = await supabase.from('courses').update(item).eq('id', id)
      if (!data || error) throw statusText || error
      return data
    } catch (err) {
      console.error('err-update', { id, item: JSON.stringify(item), err })
      throw err
    }
  }

  async upsert (items = []) {
    const self = this
    let upserted = []
    let errors = []

    await Promise.all(items.map(async item => {
      try {
        const data = await self.selectOne('link', item.link)
        console.log({ data })
        if (data?.id) await self.update(data.id, item)
        else await self.insert(item)
        upserted.push(item.title)
      } catch (err) {
        errors.push(item.title)
        throw err
      }
    }))

    return { upserted, errors }
  }
}
