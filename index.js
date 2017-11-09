'use strict'

const ztable = require('ztable')

function average(numbers) {
	let total = 0

	for(const i of numbers) {
		total += i
	}

	return (total / numbers.length)
}

module.exports = function(samples) {
	const categories = Object.keys(samples)
	let normalized = [ ]

	for(const category of categories) {
		const sample = samples[category]

		if((typeof sample.mean !== 'number') || (typeof sample.sd !== 'number')) {
			throw new Error('Mean and standard deviation (sd) must be of type `number`')
		}

		const data = [ ].concat(sample.sample)

		// Normalize each member of the sample based on its population mean and sd
		for(let i = 0; i < data.length; i ++) {
			const num = data[i]
			data[i] = (num - sample.mean) / sample.sd
		}

		normalized = normalized.concat(data)
	}

	const mean = average(normalized)
	const standardError = 1 / Math.sqrt(normalized.length)
	let zScore = Math.round((mean / standardError) * 1000000) / 1000000

	// account for -0
	if(zScore === 0) {
		zScore = 0
	}

	const marginOfError95 = 1.96 * standardError
	const marginOfError98 = 2.33 * standardError
	const createInterval = marginOfError => {
		return {
			low: mean - marginOfError,
			high: mean + marginOfError,
			marginOfError
		}
	}

	return {
		samples: normalized,
		mean,
		standardError,
		zScore,
		proportion: ztable(zScore),
		n: normalized.length,
		confidenceInterval95: createInterval(marginOfError95),
		confidenceInterval98: createInterval(marginOfError98)
	}
}
