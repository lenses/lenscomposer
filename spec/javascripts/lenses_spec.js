//= lenses

beforeEach(function() {
  MagicLamp.load("lenses/new");
});

describe("Saving Lenses Data", function(){
  it("Get Data From All El", function() {
    els = Lenses.getAllElData();
    expect(els).to.be.an('array');
  });
});
