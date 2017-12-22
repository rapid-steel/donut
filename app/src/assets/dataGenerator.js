export default function dataGenerator() {

  var samples = 100;
  if (this.data === undefined) {

    var dataX = d3.range(samples)
    var dataY = d3.range(samples).map(d3.randomBates(10));

    this.data = []
    for (let i = 0; i < samples; i++) {
      this.data.push({ key: dataX[i], value: dataY[i] })
    }

    this.warning = false
    this.level = 100

  }
  else {

    this.data.push({ key: (this.data[this.data.length - 1].key + 1), value: d3.randomBates(10)() })
    this.data.shift()

    this.level -= 1;

    if (this.level == 0) this.level = 100

    if (this.level <= 95) {
      this.warning = true
    }
    else {
      this.warning = false
    }

  }

  return { data: this.data, level: this.level, warning: this.warning }
}