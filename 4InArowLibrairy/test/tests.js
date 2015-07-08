QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});
Modele.isGameFinish(false);
QUnit.test( "hello test", function( assert ) {
	Modele.setModel([
		"0000000",
		"0000000",
		"0000000",
		"0000000",
		"0000000",
		"0011110",
	])
    assert.ok( true == Modele.isGameFinish(38));
});
QUnit.test( "hello test", function( assert ) {
	Modele.setModel([
		"1000000",
		"1000000",
		"1000000",
		"1000000",
		"0000000",
		"0000000",
	])
    assert.ok( true == Modele.isGameFinish(0));
});
QUnit.test( "hello test", function( assert ) {
	Modele.setModel([
		"0000000",
		"0000000",
		"0100000",
		"0010000",
		"0001000",
		"0000100",
	])
    assert.ok( true == Modele.isGameFinish(15));
});
QUnit.test( "hello test", function( assert ) {
	Modele.setModel([
		"0000000",
		"0000000",
		"0000000",
		"0000000",
		"0000000",
		"0011110",
	])
    assert.ok( true == Modele.isGameFinish(0));
});

QUnit.test( "hello test", function( assert ) {
	Modele.setModel([
		"0000000",
		"0000000",
		"0000000",
		"0000000",
		"0000000",
		"0010110",
	])
    assert.ok( false == Modele.isGameFinish(39));
});