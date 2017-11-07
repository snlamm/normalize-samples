# normalize-samples

<a href="https://travis-ci.org/snlamm/normalize-samples"><img src="https://travis-ci.org/snlamm/normalize-samples.svg?branch=master" alt="Build Status"></a>
<a href='https://coveralls.io/github/snlamm/normalize-samples?branch=master'><img src='https://coveralls.io/repos/github/snlamm/normalize-samples/badge.svg?branch=master' alt='Coverage Status' /></a>
<a href="https://www.npmjs.com/package/normalize-samples"><img src="https://img.shields.io/npm/v/normalize-samples.svg" alt="NPM Version"></a>
<a href="https://www.npmjs.com/package/normalize-samples"><img src="https://img.shields.io/npm/l/normalize-samples.svg" alt="License"></a>

A light tool to normalize a sample drawn from multiple populations. Outputs include a normalized Z-score and confidence intervals for the sample.

## Example
```js
const normalize = require('normalize-samples')

// For each population, provide the population mean and standard deviation.
// Use whichever population names you want.
// There's no limit on the number of populations or sample sizes.
const samples = {
	popuplationNameA: {
		mean: 43.93,
		sd: 30.746,
		sample: [ 20,  42,  30, ..., 21,  89, 29 ]
	},
	popuplationNameB: {
		mean: 490.14,
		sd: 290.043,
		sample: [ 632,  606,  836,, ..., 306,  191,  773 ]
	}
}

const sampleResults = normalize(samples)
return sampleResults
// All results are normalized
/*
{
	samples: [ -0.7783126260326547, -0.0627723931568334, ..., 1.4691109994977396],
	n: 50,
	mean: 0.060919568506139964,
	standardError: 0.14142135623,
	zScore: 0.182759,
	proportion: 0.5714,
	confidenceInterval95: {
		low: -0.2162662897,
		high: 0.33810542671,
		marginOfError: 0.27718585821
	},
	confidenceInterval98: {
		low: -0.2685921915,
		high: 0.39043132851,
		marginOfError: 0.32951176001
	}
}
*/
```

## Installation
This plugin is compatible with Node versions >= 4.8.6.

Add the `normalize-samples` package via your preferred package manager:

```shell
npm install --save normalize-samples
```

## Contributing
Contributions are always welcome. You are encouraged to open issues and merge requests.

To run the tests, use `npm run test`.
