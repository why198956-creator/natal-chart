// Browser bundle entry point
// Exposes window.BaziCalc.calcFull(birthInfo) → enriched chart JSON

const { createChart } = require('../calculator/dist/yiqi-core/index')
const { getZhiCangGanFull } = require('../calculator/dist/yiqi-core/bazi')
const { enrichBazi } = require('../calculator/dist/bazi-enrich/enrich')

function calcFull(birthInfo) {
  const chart = createChart(birthInfo)
  const dm = chart.bazi.dayMaster
  const z = chart.bazi.siZhu

  chart.bazi.cangGan = {
    year:  getZhiCangGanFull(z.year.zhi,  dm),
    month: getZhiCangGanFull(z.month.zhi, dm),
    day:   getZhiCangGanFull(z.day.zhi,   dm),
    hour:  getZhiCangGanFull(z.hour.zhi,  dm),
  }

  if (chart.bazi.dayun && Array.isArray(chart.bazi.dayun)) {
    for (const d of chart.bazi.dayun) {
      if (d.endAge == null) d.endAge = d.startAge + 9
    }
  }

  const siZhuCn = {
    年: { gan: z.year.gan,  zhi: z.year.zhi  },
    月: { gan: z.month.gan, zhi: z.month.zhi },
    日: { gan: z.day.gan,   zhi: z.day.zhi   },
    时: { gan: z.hour.gan,  zhi: z.hour.zhi  },
  }
  chart.bazi.enrichment = enrichBazi(siZhuCn)

  return chart
}

window.BaziCalc = { calcFull }
