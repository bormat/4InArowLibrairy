		it("joueEn24", function(){
			Modele.setModel([
			"0000000",
			"0000000",
			"0000000",
			"0000000",
			"0000000",
			"0011110",
			])
			expect(Modele.isGameFinish(38).toEqual(true));
		});