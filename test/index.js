const test = require('ava')
const normalize = require('../index.js')
const popA = {
	name: 'popA',
	// eslint-disable-next-line max-len
	data: [ 20,  42,  30,  95,  66,  55,  46,  94,  27,  37,  90,  10,  22,  55,  31,  18,  26,  83,  30,  22,  2,  90,  28,  64,  94,  79,  9,  21,  56,  69,  21,  33,  18,  55,  67,  19,  43,  87,  26,  5,  5,  6,  7,  27,  7,  2,  49,  46,  63,  20,  5,  35,  27,  14,  19,  5,  0,  87,  69,  33,  48,  43,  3,  58,  7,  87,  53,  5,  51,  40,  14,  96,  91,  95,  25,  25,  79,  4,  57,  44,  84,  83,  82,  42,  9,  19,  77,  90,  81,  31,  50,  6,  87,  0,  88,  99,  90,  21,  89,  29 ],
	mean: 43.93,
	sd: 30.746,
	n: 100
}

const popB = {
	name: 'popB',
	// eslint-disable-next-line max-len
	data: [ 632,  606,  836,  306,  191,  773,  940,  359,  165,  454,  699,  62,  673,  957,  399,  68,  523,  847,  671,  148,  653,  579,  32,  386,  337,  275,  289,  753,  895,  843,  722,  789,  107,  39,  508,  695,  739,  311,  914,  681,  247,  362,  354,  238,  947,  758,  199,  840,  696,  991,  648,  671,  626,  5,  948,  249,  479,  532,  962,  181,  636,  42,  831,  260,  212,  89,  19,  549,  309,  253,  964,  566,  312,  313,  79,  722,  467,  78,  561,  969,  238,  324,  454,  784,  583,  604,  696,  519,  80,  868,  91,  517,  655,  307,  636,  51,  323,  971,  24,  269 ],
	mean: 490.14,
	sd: 290.043,
	n: 100
}


const popC = {
	name: 'popC',
	// eslint-disable-next-line max-len
	data: [ 25,  61,  23,  52,  23,  53,  22,  27,  53,  40,  41,  23,  14,  37,  37,  37,  15,  14,  23,  55,  13,  50,  45,  71,  14,  40,  52,  26,  42,  13,  45,  34,  27,  60,  48,  49,  55,  31,  52,  37,  53,  14,  32,  67,  43,  16,  26,  60,  57,  31,  28,  37,  50,  44,  25,  18,  14,  40,  22,  42,  29,  18,  45,  43,  57,  47,  41,  15,  21,  55,  44,  28,  41,  41,  50,  13,  29,  26,  65,  57,  47,  12,  54,  60,  17,  13,  48,  17,  45,  52,  69,  36,  53,  49,  45,  52,  10,  48,  15,  55 ],
	mean: 37.6,
	sd: 15.928,
	n: 100
}

const populate = (a, b, c) => {
	return {
		popA: {
			sd: popA.sd,
			mean: popA.mean,
			sample: popA.data.slice(a[0], a[1])
		},
		popB: {
			sd: popB.sd,
			mean: popB.mean,
			sample: popB.data.slice(b[0], b[1])
		},
		popC: {
			sd: popC.sd,
			mean: popC.mean,
			sample: popC.data.slice(c[0], c[1])
		}
	}
}

const round = original => {
	return Math.round(original * 10000) / 10000
}

const checkResults = (t, result, desired) => {
	t.is(result.zScore, desired.zScore)
	t.is(result.proportion, desired.proportion)
	t.is(result.n, desired.n)
	t.is(round(result.mean), desired.mean)
	t.is(round(result.standardError), desired.standardError)

	t.is(round(result.confidenceInterval95.low), desired.confidenceInterval95Low)
	t.is(round(result.confidenceInterval95.high), desired.confidenceInterval95High)
	t.is(round(result.confidenceInterval95.marginOfError), desired.confidenceInterval95Margin)

	t.is(round(result.confidenceInterval98.low), desired.confidenceInterval98Low)
	t.is(round(result.confidenceInterval98.high), desired.confidenceInterval98High)
	t.is(round(result.confidenceInterval98.marginOfError), desired.confidenceInterval98Margin)
}

test('First 3 from each', t => {
	const samples = populate([ 0, 3 ], [ 0, 3 ], [ 0, 3 ])
	const result = normalize(samples)

	checkResults(t, result, {
		zScore: 0.182759,
		proportion: 0.5714,
		n: 9,
		mean: 0.0609,
		standardError: 0.3333,
		confidenceInterval95Low: -0.5924,
		confidenceInterval95High: 0.7143,
		confidenceInterval95Margin: 0.6533,
		confidenceInterval98Low: -0.7157,
		confidenceInterval98High: 0.8376,
		confidenceInterval98Margin: 0.7767
	})
})

test('One population as sample should have a 0.5 percentile', t => {
	const samples = populate([ 0, 100 ], [ 0, 0 ], [ 0, 0 ])
	const result = normalize(samples)

	checkResults(t, result, {
		zScore: 0,
		proportion: 0.5,
		n: 100,
		mean: -0,
		standardError: 0.1,
		confidenceInterval95Low: -0.196,
		confidenceInterval95High: 0.196,
		confidenceInterval95Margin: 0.196,
		confidenceInterval98Low: -0.233,
		confidenceInterval98High: 0.233,
		confidenceInterval98Margin: 0.233
	})
})

test('All populations as sample should have a 0.5 percentile', t => {
	const samples = populate([ 0, 100 ], [ 0, 100 ], [ 0, 100 ])
	const result = normalize(samples)

	checkResults(t, result, {
		zScore: 0,
		proportion: 0.5,
		n: 300,
		mean: -0,
		standardError: .0577,
		confidenceInterval95Low: -0.1132,
		confidenceInterval95High: 0.1132,
		confidenceInterval95Margin: 0.1132,
		confidenceInterval98Low: -0.1345,
		confidenceInterval98High: 0.1345,
		confidenceInterval98Margin: 0.1345
	})
})

test('Differently sized slices', t => {
	const samples = populate([ 4, 25 ], [ 15, 35 ], [ 3, 34 ])
	const result = normalize(samples)

	checkResults(t, result, {
		zScore: -0.379218,
		proportion: 0.3557,
		n: 72,
		mean: -0.0447,
		standardError: .1179,
		confidenceInterval95Low: -0.2757,
		confidenceInterval95High: 0.1863,
		confidenceInterval95Margin: 0.231,
		confidenceInterval98Low: -0.3193,
		confidenceInterval98High: 0.2299,
		confidenceInterval98Margin: 0.2746
	})
})

test('Throw if mean or sd are not numbers', t => {
	const samples = populate([ 4, 25 ], [ 15, 35 ], [ 3, 34 ])
	samples.popA.sd = null

	const error1 = t.throws(() => normalize(samples), Error)
	t.is(error1.message, 'Mean and standard deviation (sd) must be of type `number`')

	const samples2 = populate([ 4, 25 ], [ 15, 35 ], [ 3, 34 ])
	samples2.popC.mean = 'should fail'

	const error2 = t.throws(() => normalize(samples2), Error)
	t.is(error2.message, 'Mean and standard deviation (sd) must be of type `number`')
})
