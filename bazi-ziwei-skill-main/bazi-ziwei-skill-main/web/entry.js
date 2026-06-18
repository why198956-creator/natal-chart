// Browser bundle entry point
// Sets window.BaziCalc = { calcFull }

try {
  var createChart = require('../calculator/dist/yiqi-core/index').createChart
  var getZhiCangGanFull = require('../calculator/dist/yiqi-core/bazi').getZhiCangGanFull
  var enrichBazi = require('../calculator/dist/bazi-enrich/enrich').enrichBazi

  function calcFull(birthInfo) {
    var chart = createChart(birthInfo)
    var dm = chart.bazi.dayMaster
    var z = chart.bazi.siZhu

    chart.bazi.cangGan = {
      year:  getZhiCangGanFull(z.year.zhi,  dm),
      month: getZhiCangGanFull(z.month.zhi, dm),
      day:   getZhiCangGanFull(z.day.zhi,   dm),
      hour:  getZhiCangGanFull(z.hour.zhi,  dm),
    }

    if (chart.bazi.dayun && Array.isArray(chart.bazi.dayun)) {
      for (var i = 0; i < chart.bazi.dayun.length; i++) {
        var d = chart.bazi.dayun[i]
        if (d.endAge == null) d.endAge = d.startAge + 9
      }
    }

    var siZhuCn = {
      年: { gan: z.year.gan,  zhi: z.year.zhi  },
      月: { gan: z.month.gan, zhi: z.month.zhi },
      日: { gan: z.day.gan,   zhi: z.day.zhi   },
      时: { gan: z.hour.gan,  zhi: z.hour.zhi  },
    }
    chart.bazi.enrichment = enrichBazi(siZhuCn)

    return chart
  }

  window.BaziCalc = { calcFull: calcFull }
  console.log('[BaziCalc] loaded OK')
} catch (e) {
  console.error('[BaziCalc] load error:', e)
}
