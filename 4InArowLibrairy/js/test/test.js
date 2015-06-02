describe("myFunction", function() {
		afterEach(function() {
			Modele.isGameFinish(false);
		});
		function testor(tab,pos,identifier){
			it(identifier+"shouldBeAt"+pos, function(){
				Modele.setModel(tab);
				expect(IA.p4BlockEasy(pos-1,true)).toEqual(pos);
			});
		}
		it("joueEn24", function(){
		Modele.setModel(
		[
        "2020100",
        "1010100",
        "2010100",
        "2210200",
        "1222100",
        "1121220",
      ])
		expect(IA.p4BlockEasy(0,true)).toEqual(24);
		});
		it("test", function(){
			Modele.setModel([
			"0000000",
			"0020100",
			"0012200",
			"0021100",
			"0212100",
			"1121220",
			])
			expect(IA.p4BlockEasy(1,true)).toEqual(10);
		});
		it("test", function(){
			Modele.setModel([
			"0100000",
			"0202100",
			"0112200",
			"0221100",
			"0212100",
			"1121220",
			])
			expect(IA.p4BlockEasy(1,true)).toEqual(9);
		});
		
		it("test", function(){
			Modele.setModel([
			"0011200",
			"0222100",
			"0112200",
			"0221100",
			"1212100",
			"1121220",
			])
			expect(IA.p4BlockEasy(1,true)).toEqual(21);
		});
		
		
		it("test", function(){
			Modele.setModel(
			[
			"0011200",
			"0022100",
			"0012200",
			"0021100",
			"0212100",
			"1121220",
			])
			expect(IA.p4BlockEasy(4,true)).not.toEqual(41);
		});
		
		
		/*it("shouldBe", function(){
		 	expect(IA.testerSiContenu3(4,6)).toEqual(3);
		}); 
		it("shouldBe", function(){
		 	expect(IA.testerSiContenu3(4,42)).toEqual(38);
		}); 
		it("shouldBe", function(){
		 	expect(IA.testerSiContenu3(4,3)).toEqual(2);
		}); 
		it("shouldBe", function(){
		 	expect(IA.testerSiContenu3(1,6)).toEqual(5);
		}); 
		it("shouldBe", function(){
		 	expect(IA.testerSiContenu3(6,5)).toEqual(1);
		}); 
		*/
it("shouldBe", function(){
			Modele.setModel([
			"0002000",
			"0001000",
			"0202000",
			"0101000",
			"0102012",
			"0121221",
	 ])
		 	expect(IA.p4BlockEasy(6,true)).not.toEqual(26);
		}); 
		
		it("shouldBe", function(){
			Modele.setModel([
			"0000000",
			"0000000",
			"0002010",
			"0001021",
			"0002012",
			"0001122",
			])
			expect(IA.p4BlockEasy(3,true)).toEqual(10);
		})
		
		it("shouldBe", function(){
		Modele.setModel([
        "0120200",
        "0210100",
        "2120200",
        "1220100",
        "2212100",
        "1121211",
        ])
		expect(IA.p4BlockEasy(6,true)).not.toEqual(33);
		})

		
it("shouldBe", function(){
			Modele.setModel([
        "0000000",
        "0000011",
        "0012012",
        "0022021",
        "0021012",
        "0211122",
	 ])
		 	expect(IA.p4BlockEasy(3,true)).toEqual(35);
		});  
	 it("shouldBe", function(){
		Modele.setModel(
			[
        "0000000",
        "0000000",
        "0002000",
        "0021000",
        "0211120",
        "1121220",
        ])
		 	expect(IA.p4BlockEasy(6,true)).toEqual(10);
	}); 
		
	 it("shouldBe", function(){
		Modele.setModel([
			"0000000",
			"0000000",
			"0001010",
			"0002120",
			"0001212",
			"0021212",
			]
		)
		expect(IA.p4BlockEasy(6,true)).toEqual(18);
	}); 
	
		
		
	it("shouldBe", function(){
		Modele.setModel(
			[
			"1120000",
			"2210000",
			"1122000",
			"2221000",
			"1212102",
			"1121201",
		   ])
		 	expect(IA.p4BlockEasy(6,true)).not.toEqual(40);
		}); 
		it("shouldBe", function(){
		Modele.setModel(
			[
			"0121100",
			"0212200",
			"0222100",
			"0111202",
			"0121201",
			"1121202",
			])
		 	expect(IA.p4BlockEasy(6,true)).toEqual(20);
		}); 
		it("shouldBe", function(){
		Modele.setModel(
			[
			"0102000",
			"0202000",
			"1101000",
			"2201100",
			"2122200",
			"2111201",
			])
		 	expect(IA.p4BlockEasy(3,true)).not.toEqual(18);
		}); 
		it("shouldBe", function(){
		Modele.setModel(
			[
			"0120200",
			"2210100",
			"2120200",
			"1220100",
			"2212110",
			"1121211",
			])
        	expect(IA.p4BlockEasy(3,true)).toEqual(26);
		}); 
		
		it("shouldBe", function(){
		Modele.setModel(
        [
        "0000000",
        "0000000",
        "0200100",
        "0100200",
        "0102200",
        "0101200",
        ]
		)
		expect(IA.p4BlockEasy(0,true)).toEqual(24);
		}); 
		it("shouldBe", function(){
			Modele.setModel(
			[
			"0002000",
			"0002000",
			"1101000",
			"2201100",
			"2122200",
			"2111201",
			])
		 	expect(IA.p4BlockEasy(2,true)).not.toEqual(18);
		}); 
		it("shouldBe", function(){
			Modele.setModel(
			[
			"0000000",
			"0002000",
			"0101000",
			"0201100",
			"0102200",
			"2101220",
			])
		 	expect(IA.p4BlockEasy(6,true)).toEqual(33);
		}); 
		
		it("shouldBe", function(){
			Modele.setModel(
			[
			"0000000",
			"0000000",
			"0201000",
			"0201100",
			"0102200",
			"2101200",
		   ])
		 	expect(IA.p4BlockEasy(6,true)).toEqual(10);
		}); 
		it("shouldBe", function(){
			Modele.setModel(
			[
			"0102000",
			"0201200",
			"0202100",
			"0201120",
			"0101210",
			"0201120",
			])
		 	expect(IA.p4BlockEasy(6,true)).toEqual(19);
		}); 
		
		it("shouldBe", function(){
					Modele.setModel(
					[
        "0020120",
        "0010210",
        "0010220",
        "0020110",
        "0010122",
        "2021112",
           ])
		 	expect(IA.p4BlockEasy(6,true)).toEqual(28);
		}); 

		it("shouldBe", function(){
					Modele.setModel(
					[
			        "0001000",
			        "0002020",
			        "0022010",
			        "0011010",
			        "0022010",
			        "0021120",
             		])
    	 			expect(IA.p4BlockEasy(6,true)).toEqual(9);
		}); 

		it("shouldBe", function(){
					Modele.setModel(
					[
			        "0000000",
			        "0002000",
			        "0002000",
			        "0001010",
			        "0002010",
			        "0001020",
			        ])
		 	expect(IA.p4BlockEasy(6,true)).not.toEqual(19);
		 })


		it("shouldBe", function(){
			Modele.setModel(
			[
	        "0101122",
	        "0202111",
	        "0201221",
	        "1201122",
	        "2102211",
	        "1221122",
	        ])
		 	expect(IA.p4BlockEasy(6,true)).toEqual(14);
		});


		it("shouldBe", function(){
				Modele.setModel(
				[
		        "0101101",
		        "0201202",
		        "0102101",
		        "0221201",
		        "0112202",
		        "2221102",
		        "1121221",
		        ])
		 	expect(IA.p4BlockEasy(6,true)).toEqual(16);
		}); 

			it("shouldBe", function(){
				Modele.setModel(
				[
		        "0022002",
		        "1012001",
		        "2022002",
		        "1021001",
		        "1212101",
		        "1121221",
		        ])
		 	expect(IA.p4BlockEasy(6,true)).toEqual(0);
		});  
		it("shouldBe", function(){
				Modele.setModel(
				[
		        "0001000",
		        "2002101",
		        "2012202",
		        "1021101",
		        "1212102",
		        "1121222",
		 ])
		 	expect(IA.p4BlockEasy(6,true)).toEqual(9);
		}); 
		it("shouldBe", function(){
			Modele.setModel(
				[
		        "0000000",
		        "0001000",
		        "0001120",
		        "0002120",
		        "0001210",
		        "0001222",
		        ])
		 	expect(IA.p4BlockEasy(13,true)).toEqual(11);
		}); 

		it("shouldBe", function(){
				Modele.setModel(
				[
        "0000000",
        "0000000",
        "0001000",
        "0002100",
        "0001210",
        "0001222",
     	 ])
		 	expect(IA.p4BlockEasy(11,true)).toEqual(10);
		}); 
        it("shouldBe", function(){
				Modele.setModel(
				[
		        "0000000",
		        "0021000",
		        "0012200",
		        "0211100",
		        "0212200",
		        "1121200",
		         ])
		 	expect(IA.p4BlockEasy(2,true)).toEqual(3);
		}); 

		it("shouldBe", function(){
				Modele.setModel(
				[
		        "0001000",
		        "0002100",
		        "0012200",
		        "0021100",
		        "1212102",
		        "1121222",
		        ])
		 	expect(IA.p4BlockEasy(6,true)).toEqual(21);
		}); 

		it("shouldBe", function(){
				Modele.setModel(
				[
		        "0000000",
		        "0022000",
		        "0022000",
		        "0011000",
		        "0012100",
		        "0121102",
		        ])
		 	expect(IA.p4BlockEasy(4,true)).not.toEqual(25);
		}); 

		it("shouldBe", function(){
				Modele.setModel(
				[
		        "0000000",
		        "0000000",
		        "0000200",
		        "0020100",
		        "0012100",
		        "0021102",
		     	 ])
			expect(IA.p4BlockEasy(4,true)).toEqual(24);
		});

		it("shouldBe", function(){
					Modele.setModel(
					[
			        "0010200",
			        "0020100",
			        "0020200",
			        "0020110",
			        "0012120",
			        "0021112",
			       ])
			expect(IA.p4BlockEasy(2,true)).toEqual(24);
		});

		it("shouldBe", function(){
				Modele.setModel(
				[
		        "0010200",
		        "0020100",
		        "0020220",
		        "0020110",
		        "0010120",
		        "0021112",
				])
					expect(IA.p4BlockEasy(2,true)).toEqual(34);
		});

		it("shouldBe", function(){
					Modele.setModel(
					[
		        "0000000",
		        "0000000",
		        "0000000",
		        "0020000",
		        "0010000",
		        "0021102",
		      ])
					expect(IA.p4BlockEasy(2,true)).toEqual(32);
		});

		it("shouldBe", function(){
					Modele.setModel(
					[
					"0000000",
					"0120100",
					"0212200",
					"0211100",
					"0212200",
					"1121200",
					])
					expect(IA.p4BlockEasy(3,true)).not.toEqual(10);
		});

		it("shouldBe", function(){
			Modele.setModel([
				"0000000",
				"0001000",
				"0002000",
				"0201000",
				"0202100",
				"0101200",
			])
			expect(IA.p4BlockEasy(5,true)).toEqual(15);
		});

		it("shouldBe", function(){
			Modele.setModel([
			"0000000",
			"0210000",
			"0122000",
			"0221010",
			"0212120",
			"1121210",
			])
			expect(IA.p4BlockEasy(5,true)).toEqual(19);
		});

		it("shouldBe", function(){
			Modele.setModel([
			"0000000",
			"0000000",
			"0020000",
			"0011021",
			"0012012",
			"0121122",
			])
			expect(IA.p4BlockEasy(5,true)).toEqual(17);
		});
		
		it("shouldBe", function(){
			Modele.setModel(
			[
				"0000000",
				"0000000",
				"0000200",
				"0020100",
				"0012110",
				"0021122",
				]
			)
			expect(IA.p4BlockEasy(4,true)).toEqual(26);
		});

		it("shouldBe", function(){
			Modele.setModel([
		"0000000",
		"0000020",
		"0000010",
		"0000020",
		"0000010",
		"0001122",
  ])
	      	expect(IA.p4BlockEasy(0,true)).toEqual(37);
		});

		it("shouldBe", function(){
			Modele.setModel([
		        "0000000",
		        "0000000",
		        "0000000",
		        "0000000",
		        "0000000",
		        "2001000",
	        ])
	      	expect(IA.p4BlockEasy(0,true)).toEqual(37);
		});

		it("shouldBe", function(){
		Modele.setModel(
		[
		"0000000",
		"0100000",
		"0200000",
		"0101100",
		"2202100",
		"2101202",
		]
		)
		expect(IA.p4BlockEasy(0,true)).toEqual(18);
		});

		it("shouldBe", function(){
		Modele.setModel(
		[
		"0000000",
		"0100000",
		"0200000",
		"0100000",
		"0202100",
		"0101202",
		]
		)
		expect(IA.p4BlockEasy(3,true)).toEqual(24);
		});

		it("shouldBe", function(){
				Modele.setModel(
				[
				"0002000",
				"0001000",
				"0001100",
				"0101200",
				"2202100",
				"2101202",
				]
				)
				expect(IA.p4BlockEasy(0,true)).toEqual(34);
		});

		it("shouldBe", function(){
				Modele.setModel(
				[
				"0000000",
				"0000000",
				"0001100",
				"0101200",
				"2202100",
				"2101202",
				]
				)
				expect(IA.p4BlockEasy(5,true)).toEqual(10);
		});
		
		it("shouldBe", function(){
				Modele.setModel(
				[
				"0002000",
				"0001100",
				"0201100",
				"0101200",
				"2202100",
				"2101202",
				]
				)
				expect(IA.p4BlockEasy(5,true)).toEqual(34);
		});
		
		it("shouldBe", function(){
				Modele.setModel(
					[
					"1201100",
					"2202200",
					"1101100",
					"1101221",
					"2202122",
					"2101212",
					]
				)
				expect(IA.p4BlockEasy(5,true)).toEqual(19);
		});
		it("shouldBe", function(){
				Modele.setModel(
				[
				"0002010",
				"0201020",
				"0202120",
				"0111220",
				"0121210",
				"0121120",
				]
				)
				expect(IA.p4BlockEasy(1,true)).toEqual(16);
		});
		it("shouldBe", function(){
				Modele.setModel(
				[
				"0002010",
				"0001020",
				"0222120",
				"0111220",
				"0121210",
				"0121120",
				]
				)
				expect(IA.p4BlockEasy(1,true)).toEqual(11);
		});
		
		it("shouldBe", function(){
				Modele.setModel(
				[
				"0002010",
				"0001020",
				"0002020",
				"0001020",
				"0001210",
				"0121120",
				]
				)
				expect(IA.p4BlockEasy(2,true)).toEqual(29);
		});
		it("shouldBe", function(){
				Modele.setModel(
				[
				"0002010",
				"0001020",
				"0202020",
				"0101220",
				"0101210",
				"0121120",
				]
				)
				expect(IA.p4BlockEasy(1,true)).toEqual(18);
		});
		it("shouldBe", function(){
				Modele.setModel(
				[
				"0002010",
				"0001020",
				"0002020",
				"0001020",
				"0001210",
				"0001120",
				]
				)
				expect(IA.p4BlockEasy(2,true)).toEqual(36);
		});
		
		it("shouldBe", function(){
				Modele.setModel(
				[
				"0000000",
				"0000000",
				"0220000",
				"0110000",
				"0120000",
				"0121002",
				]
				)
				expect(IA.p4BlockEasy(2,true)).toEqual(35);
		});

		it("shouldBe", function(){
				Modele.setModel(
					[
					"0000000",
					"0000000",
					"0200000",
					"0100000",
					"0120000",
					"0121002"
					]
				)
				expect(IA.p4BlockEasy(1,true)).toEqual(23);
		});
		
		it("shouldBe", function(){
				Modele.setModel(
					[
					"0000000",
					"0000000",
					"0000000",
					"0020010",
					"2210120",
					"1121220",
					]
				)
				expect(IA.p4BlockEasy(2,true)).toEqual(19);
		});
		it("shouldBe", function(){
				Modele.setModel(
					[
					"0102000",
					"0201000",
					"0202020",
					"0211010",
					"0121010",
					"0221120",
					]
				)
				expect(IA.p4BlockEasy(2,true)).not.toEqual(16);
		});
		
		it("shouldBe", function(){
				Modele.setModel(
				[
				"0110000",
				"0210000",
				"1120000",
				"2220200",
				"2210100",
				"1121200",
				]
				)
				expect(IA.p4BlockEasy(2,true)).toEqual(18);
		});
			
	
	it("shouldBe", function(){
		Modele.setModel(
			[
			"0000000",
			"0000000",
			"0000000",
			"0200000",
			"0100000",
			"0201000",
			]
		)
		expect(IA.p4BlockEasy(2,true)).toEqual(31);
	});
	it("shouldBe", function(){
		Modele.setModel(
			[
				"0102200",
				"0201000",
				"0202000",
				"0211010",
				"0121010",
				"0221120",
			]
		)
		expect(IA.p4BlockEasy(2,true)).not.toEqual(31);
	});
	
	it("shouldBe", function(){
			Modele.setModel(
			[
			"1102000",
			"2201000",
			"1102000",
			"2201100",
			"1112200",
			"2221102",
			]
			)
	expect(IA.p4BlockEasy(2,true)).toEqual(34);
	});
	it("shouldBe", function(){
			Modele.setModel(
			[
			"0000000",
			"0000200",
			"0010100",
			"0020200",
			"2210100",
			"1121200",
			]
			)
	expect(IA.p4BlockEasy(2,true)).not.toEqual(22);
	});
		
	it("shouldBe", function(){
		Modele.setModel(
		[
		"0000000",
		"0011000",
		"0022000",
		"0021000",
		"0212100",
		"1121202",
		]
		)
		expect(IA.p4BlockEasy(2,true)).toEqual(34);
		});
		
		
		it("shouldBe", function(){
		Modele.setModel(
			[
			"0000000",
			"0000000",
			"0020000",
			"0021000",
			"0212100",
			"1121200",
			]
		)
		expect(IA.p4BlockEasy(2,true)).toEqual(9);
		});
		
		it("shouldBe", function(){
		Modele.setModel(
			[
			"0002000",
			"0001000",
			"0002000",
			"0021000",
			"0012120",
			"0121120",
			]
		)
		expect(IA.p4BlockEasy(4,true)).toEqual(16);
		});
			it("shouldBe", function(){
		Modele.setModel(
			[
			"0012000",
			"0021000",
			"0012200",
			"0021100",
			"0012120",
			"0121120",
			]
		)
		expect(IA.p4BlockEasy(4,true)).toEqual(11);
		});
		
	
		it("shouldBe", function(){
		Modele.setModel(
			[
			"0001000",
			"0002101",
			"0012202",
			"0021101",
			"0212102",
			"1121221",
			]
		)
		expect(IA.p4BlockEasy(4,true)).toEqual(9);
		});
		it("shouldBe", function(){
		Modele.setModel(	
			[
			"0000000",
			"0020000",
			"0012000",
			"0021000",
			"0212100",
			"1121221",
			]
		)
		expect(IA.p4BlockEasy(4,true)).toEqual(25);
		});
		it("shouldBe", function(){
			Modele.setModel(
			[
			"0002000",
			"0001000",
			"0012000",
			"0021000",
			"0012020",
			"0121120",
			]
			)
			expect(IA.p4BlockEasy(4,true)).toEqual(32);
		});
		it("shouldBe", function(){
			Modele.setModel(
			[
				"0021010",
				"0012020",
				"0021012",
				"0011021",
				"0022012",
				"0021021",
			]
			)
			expect(IA.p4BlockEasy(4,true)).not.toEqual(36);
		});
		
		it("shouldBe", function(){
			Modele.setModel(
			[
			"0002000",
			"0011000",
			"0022000",
			"0021000",
			"0212100",
			"1121200",
			]
			)
			expect(IA.p4BlockEasy(4,true)).toEqual(41);
		});
		it("shouldBe", function(){
			Modele.setModel(
			[
			"0002000",
			"0211000",
			"0122000",
			"0221000",
			"0212100",
			"1121201",
			]
			)
			expect(IA.p4BlockEasy(1,true)).not.toEqual(40);
		});
		
		
		it("shouldBe", function(){
			Modele.setModel(
			[
			"0120002",
			"0210001",
			"0120002",
			"0220001",
			"0210102",
			"1121201",
			]
			)
			expect(IA.p4BlockEasy(2,true)).not.toEqual(25);
		});
		
		it("shouldBe", function(){
			Modele.setModel(
			[
			"0020000",
			"0010000",
			"0020000",
			"0020000",
			"0210100",
			"1121200",
			]
			)
			expect(IA.p4BlockEasy(2,true)).not.toEqual(40);
			expect(IA.p4BlockEasy(2,true)).not.toEqual(25);
		});
		
		it("shouldBe", function(){
			Modele.setModel(
			[
			"0000000",
			"0022000",
			"0012200",
			"0011100",
			"0012200",
			"1121200",
			]
			)
			expect(IA.p4BlockEasy(2,true)).toEqual(11);
		});
		
		it("shouldBe", function(){
			Modele.setModel(
			[
			"0200000",
			"0220000",
			"0110000",
			"0220000",
			"0210100",
			"1121200",
			]	
			)
			expect(IA.p4BlockEasy(2,true)).toEqual(40);
		});
	it("shouldBe", function(){
			Modele.setModel(
			[
			"0010000",
			"0022100",
			"0012200",
			"0021100",
			"0212120",
			"1121221",
			]	
			)
			expect(IA.p4BlockEasy(2,true)).toEqual(26);
		});
		it("shouldBe", function(){
			Modele.setModel(
			[
			"0012000",
			"0022100",
			"0012210",
			"0021120",
			"0211120",
			"1121220",
			]
			)
			expect(IA.p4BlockEasy(2,true)).toEqual(22);
		});
		it("shouldBe", function(){
			Modele.setModel(
			[
			"0011220",
			"0022110",
			"0012210",
			"2221120",
			"1211120",
			"1121220",
			]
			)
			expect(IA.p4BlockEasy(2,true)).toEqual(14);
		});
		it("shouldBe", function(){
			Modele.setModel(
			[
			"0122100",
			"0221200",
			"0212102",
			"0221101",
			"0121201",
			"1121122",
			]
			)
			expect(IA.p4BlockEasy(2,true)).toEqual(13);
		});
		
		it("shouldBe", function(){
			Modele.setModel(
			[
			"2201000",
			"1202000",
			"2101000",
			"1202000",
			"2101000",
			"1121002",
			]
			)
			expect(IA.p4BlockEasy(2,true)).not.toEqual(39);
		});
		
		it("shouldBe", function(){
			Modele.setModel(
			[
			"0100000",
			"0201000",
			"0202000",
			"0201000",
			"0121000",
			"0121002",
			]
			)
			expect(IA.p4BlockEasy(2,true)).toEqual(34);
		});
		
		it("shouldBe", function(){
			Modele.setModel(
			[
			"0122000",
			"0221000",
			"0212000",
			"0221101",
			"0121201",
			"0121102",
			]
			)
			expect(IA.p4BlockEasy(2,true)).not.toEqual(20);
		});
		
		it("shouldBe", function(){
			Modele.setModel(
			[
			"0000000",
			"0000000",
			"0000000",
			"0020000",
			"0210100",
			"1121220",
			]
			)
			expect(IA.p4BlockEasy(6,true)).toEqual(31);
		});
		
		it("shouldBe", function(){
			Modele.setModel(
			[
			"1120200",
			"1210200",
			"2120200",
			"1220100",
			"2212100",
			"1121211",
			]
			)
			expect(IA.p4BlockEasy(4,true)).toEqual(34);
		});
		
		it("shouldBe", function(){
			Modele.setModel(
			[
				"0211200",
				"0211100",
				"0212200",
				"0122200",
				"2211102",
				"1121201",
			]
			)
			expect(IA.p4BlockEasy(6,true)).toEqual(40);
		});
		it("shouldBe", function(){
			Modele.setModel(
			[
			"0000000",
			"0000000",
			"0001110",
			"0002120",
			"0212210",
			"1121222",
			]
			)
			expect(IA.p4BlockEasy(6,true)).toEqual(11);
		});
		it("shouldBe", function(){
		Modele.setModel(
		[
		"0000000",
		"0000000",
		"0001100",
		"0102200",
		"0202110",
		"0121220",
		]
		)
		expect(IA.p4BlockEasy(6,true)).not.toEqual(30);
		});
		
		it("shouldBe", function(){
			Modele.setModel(
			[
			"0000200",
			"0021100",
			"0212200",
			"0121100",
			"2211200",
			"1121212",
			]
			)
			expect(IA.p4BlockEasy(6,true)).not.toEqual(34);
		});
		
		it("shouldBe", function(){
			Modele.setModel(
	
				[
				"0212200",
				"0221100",
				"2221202",
				"1122101",
				"2211121",
				"1121211",
				]
			)
			expect(IA.p4BlockEasy(6,true)).toEqual(13);
		});
		
		
		it("shouldBe2", function(){
		Modele.setModel(
		[
		"0120000",
		"0220000",
		"0210000",
		"0122200",
		"1211101",
		"1121202",
		]
		)
		expect(IA.p4BlockEasy(2,true)).not.toEqual(40);
		});
		
		it("shouldBe2", function(){
		Modele.setModel(
		[
		"0000000",
		"0000000",
		"0100000",
		"0122100",
		"0212200",
		"1121200",
		]
		)
		expect(IA.p4BlockEasy(4,true)).toEqual(16);
		});
		
		it("shouldBe40", function(){
		Modele.setModel(
		[
		"0200000",
		"0110000",
		"0120000",
		"0122000",
		"0212000",
		"1121200",
		]
		)
		expect(IA.p4BlockEasy(1,true)).toEqual(40);
		});
		
	
 
		
		it("shouldBe2", function(){
		Modele.setModel(
		[
		"0202000",
		"0211000",
		"0121000",
		"0121000",
		"0212200",
		"1121200",
		]
		)
		expect(IA.p4BlockEasy(4,true)).toEqual(2);
		});
		
		
		it("shouldBe14", function(){
		Modele.setModel(
		[
		"0022122",
		"0011211",
		"0012112",
		"2012211",
		"1022122",
		"2121211",
		]
		)
		expect(IA.p4BlockEasy(6,true)).toEqual(14);
		});
		
		it("shouldBe14", function(){
		Modele.setModel(
		[
		"0022122",
		"0011211",
		"0012112",
		"2012211",
		"1022122",
		"2121211",
		]
		)
		expect(IA.p4BlockEasy(6,true)).toEqual(14);
		});
		
		it("shouldBe14", function(){
		Modele.setModel(
		[
		"0000000",
		"0000000",
		"0110000",
		"0122000",
		"0212200",
		"1121200",
		]
		)
		expect(IA.p4BlockEasy(39,true)).toEqual(28);
		});
		
		
		
		it("shouldBe16", function(){
		Modele.setModel(
		[
		"0000000",
		"0000000",
		"0100000",
		"0122000",
		"0212000",
		"1121200",
		]
		)
		expect(IA.p4BlockEasy(3,true)).toEqual(16);
		});


		it("shouldBe25", function(){
		Modele.setModel(
		[
		"0002000",
		"0001000",
		"0012000",
		"0021000",
		"0012220",
		"1121120",
		])
		expect(IA.p4BlockEasy(5,true)).toEqual(25);
		});
		
		it("PlayAt22", function(){
		Modele.setModel(
		[
        "0020211",
        "0010122",
        "0010211",
        "0020222",
        "0210121",
        "2121211",
        ])
		expect(IA.p4BlockEasy(3,true)).toEqual(28);
		});
		
		it("PlayAt40", function(){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0000000",
        "0020000",
        "0210000",
        "1121200",
        ])
		expect(IA.p4BlockEasy(3,true)).toEqual(32);
		});
		
		
		it("PlayAt26", function(){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0000000",
        "0020200",
        "0010120",
        "0021211",
        ])
		expect(IA.p4BlockEasy(3,true)).toEqual(16);
		});
		
	
		it("PlayAt26", function(){
		Modele.setModel(
		[
        "0000000",
        "0000002",
        "0012001",
        "0021001",
        "0012021",
        "1021022",
        ])		
		expect(IA.p4BlockEasy(1,true)).toEqual(26);
		
		});
		it("PlayAt27", function(){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0012000",
        "0021000",
        "0012001",
        "0021002",
        ])	
		expect(IA.p4BlockEasy(1,true)).toEqual(27);
		});
		
		it("PlayAt21", function(){
		Modele.setModel(
		[
        "0011001",
        "0222002",
        "0112001",
        "0221002",
        "1212101",
        "1121222",
      ])	
		expect(IA.p4BlockEasy(1,true)).toEqual(21);
		});
		
		it("notPlayAt25", function(){
		Modele.setModel(
		[
        "0011001",
        "0022002",
        "0012001",
        "0021002",
        "0012101",
        "1021222",
       ])	
		expect(IA.p4BlockEasy(16,true)).toEqual(36);
		});
		
		it("notPlayAt22", function(){
		Modele.setModel(
		[
        "0010210",
        "0020110",
        "0020111",
        "2020221",
        "2210122",
        "1121221",
	])	
		expect(IA.p4BlockEasy(15,true)).not.toEqual(22);
		});
		
		it("jouepasen10", function(){
		Modele.setModel(
		[
        "0021120",
        "0012210",
        "0021120",
        "0122210",
        "0211120",
        "1121222",
    ])	
		expect(IA.p4BlockEasy(0,true)).toEqual(15);
		});
		
		it("joueEn24", function(){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0000100",
        "0020200",
        "0210120",
        "1121220",
    ])	
		expect(IA.p4BlockEasy(0,true)).not.toEqual(26);
		});
		

		testor([
        "0000000",
        "0000000",
        "0010101",
        "0220202",
        "1210102",
        "1121202",
        ],15,"#999");
		
		
		
		
		testor(
		[
        "0000000",
        "0000000",
        "0002000",
        "0001000",
        "0002010",
        "0001020",
        ],26,"#998");
		
		
		
		testor(
		[
        "0000000",
        "0000000",
        "0020100",
        "0020220",
        "0210211",
        "1121211",
        ],19,"#997");
		
		
		testor(
		[
        "0002000",
        "0021120",
        "0012210",
        "0021120",
        "0012120",
        "0121120",
        ],35,"#996");
		
		testor([
        "0002000",
        "0001000",
        "0012010",
        "0021020",
        "0012120",
        "0121120",
        ],35,"#995");
		
		testor(
		[
        "0000000",
        "0001020",
        "0002010", 
        "0001020",
        "0002010",
        "0001020",
        ],3,"#994");
		
		it("shouldBeAt19", function(){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0020100",
        "0020220",
        "0210210",
        "1121211",
      ])	
		expect(IA.p4BlockEasy(33,true)).toEqual(19);
		});
		
		it("shouldNotBeAt37", function(){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0020100",
        "0020200",
        "0210210",
        "1121211",
        ])	
		expect(IA.p4BlockEasy(33,true)).not.toEqual(37);
		});
		

	
		it("shouldBeAt19", function(){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0000000",
        "0021020",
        "0212221",
        "1121211",
        ])	
		expect(IA.p4BlockEasy(33,true)).toEqual(19);
		});
		it("shouldBeAt27", function(){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0012000",
        "0021000",
        "0212221",
        "1121211",
        ])	
		expect(IA.p4BlockEasy(33,true)).toEqual(27);
		});
		
		it("shouldBeAt26", function(){
		Modele.setModel(
		[
        "1000000",
        "1000100",
        "2000200",
        "1101200",
        "1202112",
        "2101222",
        ])	
		expect(IA.p4BlockEasy(33,true)).toEqual(26);
		});
		
		it("shouldBeAt26", function(){
		Modele.setModel(
		[
        "1000000",
        "1000100",
        "2000200",
        "1101200",
        "1202112",
        "2101222",
        ])	
		expect(IA.p4BlockEasy(33,true)).toEqual(26);
		});
		
		it("shouldNotBeAt33", function(){
		Modele.setModel(
		[
        "1000000",
        "1000100",
        "2000200",
        "1101200",
        "1202102",
        "2101222",
        ])	
		expect(IA.p4BlockEasy(33,true)).not.toEqual(26);
		});
		
		it("shouldBeAt32", function(){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "1100000",
        "2100000",
        "1202000",
        "2101202"
		])	
		expect(IA.p4BlockEasy(33,true)).toEqual(32);
		});
		
		
		it("shouldnNotBeAt26", function(){
		Modele.setModel(
		[
        "0002000",
        "0001100",
        "0001100",
        "0001200",
        "2202122",
        "2101212",
        ])	
		expect(IA.p4BlockEasy(33,true)).not.toEqual(26);
		});
		
		it("shouldnNotBeAt41", function(){
		Modele.setModel(
		[
        "0012000",
        "0021000",
        "0012000",
        "0211000",
        "0212020",
        "0121120",
        ])	
		expect(IA.p4BlockEasy(33,true)).not.toEqual(41);
		});
		
		
		it("shouldnNotBeAt40", function(){
		Modele.setModel(
		[
		"0010000",
		"0020000",
		"0022000",
		"0021000",
		"0212100",
		"1121201"
        ])	
		expect(IA.p4BlockEasy(33,true)).not.toEqual(40);
		});
		
		it("shouldBeAt32", function(){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0020000",
        "0020000",
        "0210000",
        "1121201",
       ])	
		expect(IA.p4BlockEasy(33,true)).toEqual(32);
		});
		
		it("shouldBeAt32bis", function(){
		Modele.setModel(
		[
        "0002000",
        "0021000",
        "0012000",
        "0211000",
        "0212000",
        "0121120",
        ])	
		expect(IA.p4BlockEasy(33,true)).toEqual(32);
		});
		
		it("shouldBeAt33", function(){
		Modele.setModel(
		[
        "0221000",
        "0122000",
        "0211000",
        "0122001",
        "0121002",
        "0121211",
        ])	
		expect(IA.p4BlockEasy(33,true)).toEqual(33);
		});
		
		it("shouldBeAt18", function(){
		Modele.setModel(
		[
        "0100000",
        "0210000",
        "0120000",
        "0220200",
        "0210100",
        "1121200",
        ])	
		expect(IA.p4BlockEasy(18,true)).toEqual(18);
		});
		
		it("shouldBeAt11", function(){
		Modele.setModel(
		[
        "0000000",
        "0110000",
        "0120200",
        "0221100",
        "2212120",
        "1121221",
        ])	
		expect(IA.p4BlockEasy(18,true)).toEqual(11);
		});
		
		it("shouldBeAt31", function(){
		Modele.setModel(
		[
        "0000000",
        "0210000",
        "0120000",
        "0220000",
        "0210100",
        "1121200",
        ])	
		expect(IA.p4BlockEasy(9,true)).not.toEqual(31);
		});
		
		  
		
		it("shouldBe3", function(){
		Modele.setModel(
		[
        "0000000",
        "0001000",
        "0102100",
        "0201200",
        "0102200",
        "2101200",
        ])	
		expect(IA.p4BlockEasy(0,true)).toEqual(3);
		});
		it("19shouldNotToBeForbiden", function(){
		Modele.setModel(
        [
        "0201100",
        "0201100",
        "0102100",
        "0201220",
        "0102210",
        "2101221",
       ])	
		expect(IA.p4BlockEasy(26,true)).toEqual(19);
		});
		
	
		it("shoulBeAt3", function(){
		Modele.setModel(
        [
        "0100000",
        "0211000",
        "0122000",
        "0221000",
        "0212100",
        "1121200",
        ])	
		expect(IA.p4BlockEasy(8,true)).toEqual(3);
		});
		
		it("shouldBe21", function(){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0020000",
        "0010000",
        "1222100",
        "1121200",
          ])	
		expect(IA.p4BlockEasy(24,true)).toEqual(24);
		});
		
		it("shouldBe12", function(){
		Modele.setModel(
		[
        "0002000",
        "0021100",
        "0012210",
        "0221120",
        "0212120",
        "1121120",
          ])
		expect(IA.p4BlockEasy(22,true)).toEqual(12);
		});
		
	    it("bloquerTroisEnLigneEn41", function(){
			Modele.setGrille(
			[0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,
			0,0,1,2,2,2,0,
			]);
			expect(IA.p4BlockEasy(0,true)).toEqual(41);
		});
		

		it("shouldNotBe2428", function(){
		Modele.setModel(
		[
        "0100000",
        "0200000",
        "0110010",
        "0220020",
        "0212220",
        "1121210",
          ])
		expect(IA.p4BlockEasy(0,true)).not.toEqual(28);
		expect(IA.p4BlockEasy(3,true)).not.toEqual(24);
		});
		
		
		it("jouerEn32", function(){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0000000",
        "0021000",
        "0012000",
        "0121200",
          ])
		expect(IA.p4BlockEasy(0,true)).toEqual(32);
		});
		
		
		it("jouePasEn21", function(){
		Modele.setModel(
		[
        "0000000",
        "0110000",
        "0220000",
        "0210000",
        "1210200",
        "1121220",
          ])
		expect(IA.p4BlockEasy(0,true)).not.toEqual(21);
		});
		////
		
		it("doubleDiagoEn26", function(){
		Modele.setModel(
		[
        "0011000",
        "0022000",
        "0011000",
        "0021000",
        "2212121",
        "1121222",
          ])
		expect(IA.p4BlockEasy(0,true)).toEqual(26);
		});
		
		it("doubleDiagoEn26bis", function(){
		Modele.setModel(
	    [
        "0012000",
        "0222000",
        "0121000",
        "0221000",
        "1212120",
        "2111210",
          ])
		expect(IA.p4BlockEasy(0,true)).toEqual(26);
		});
				
		
		

		
		it("gameOver", function(){
		Modele.setModel(
		[
        "0000000",
        "0080000",
        "1802001",
        "8128318",
        "4218188",
        "2421888",
       ])
		expect(Modele.isGameFinish(14)).toBe(true);
		expect(Modele.isGameFinish(27)).not.toBe(true);
		expect(Modele.isGameFinish(20)).toBe(true);
		expect(Modele.isGameFinish(29)).toBe(true);
		expect(Modele.isGameFinish(29)).toBe(true);

		});
			
		it("shouldnotBe40", function(){
		Modele.setModel(
		[
        "1201100",
        "2202100",
        "1101200",
        "1201100",
        "2102200",
        "2121202",
         ])
		expect(IA.p4BlockEasy(40)).not.toEqual(40);
		});
		
		it("winIn2", function(){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0000000",
        "0201100",
        "0202100",
        "1121200",
          ])
		expect(IA.p4BlockEasy(17,true)%7).toEqual(18%7);
		});
		
		it("shoudNotSucideAt32", function(){
		Modele.setModel(
		[
        "0022020",
        "0011010",
        "0022010",
        "0011020",
        "0012021",
        "0121122",
     ])
		expect(IA.p4BlockEasy(17,true)).not.toEqual(32);
		});
		

		it("shouldDontHelpAt18", function(){
		Modele.setModel(
		[
        "0011010",
        "0022020",
        "0012110",
        "0021220",
        "2012210",
        "1021120",
         ])
		expect(IA.p4BlockEasy(4,true)).not.toEqual(18);
		});
		
		it("shouldBeAt17", function(){
		Modele.setModel(
		[
        "0000006",
        "0000000",
        "0000000",
        "0101100",
        "2202100",
        "2101200",
        ])
		expect(IA.p4BlockEasy(4,true)).toEqual(17);
		});
		it("shouldNotBeAt18", function(){
		Modele.setModel(
		[
        "0022000",
        "0111000",
        "0112000",
        "1222110",
        "2212220",
        "1121210",
        ])
		expect(IA.p4BlockEasy(4,true)).not.toEqual(18);
		});
		
		


		
});
		