		function testor(tab,pos,identifier){
			QUnit.test(identifier+"shouldBeAt"+pos, function(assert){
				Modele.setModel(tab);
				assert.ok(IA.p4BlockEasy(pos-1,true) == pos);
			});
		}
		QUnit.test("joueEn24", function(assert){
			Modele.weHaveAWinner(false)
			Modele.setModel([
			"0000000",
			"0000000",
			"0000000",
			"1000000",
			"2020100",
			"2011200",
			])
			assert.ok(IA.p4BlockEasy(32,true) == 25);
		});
		QUnit.test("joueEn24", function(assert){
			Modele.setModel([
			"0122001",
			"2211002",
			"2122002",
			"1221001",
			"2212101",
			"1121211",
			])
			assert.ok(IA.p4BlockEasy(32,true) == 0);
		});
		
		QUnit.test("joueEn24", function(assert){
		Modele.setModel([
			"0110001",
			"0220002",
			"0220001",
			"0110002",
			"0120201",
			"1121202",
		])
		assert.ok(IA.p4BlockEasy(32,true) == 25);
		});
		 
		QUnit.test("joueEn24", function(assert){
		Modele.setModel([
		"0100000",
		"0220100",
		"0112200",
		"0221100",
		"0212100",
		"1121220",
		])
		assert.ok(IA.p4BlockEasy(32,true) == 10);
		});

		QUnit.test("joueEn24", function(assert){
		Modele.setModel([
        "0000000",
        "0000002",
        "0000101",
        "0001202",
        "0002101",
        "2101202",
        ])
		assert.ok(IA.p4BlockEasy(32,true) == 17);
		});
		
		QUnit.test("joueEn24", function(assert){
		Modele.setModel([
			"0021100",
			"0012200",
			"0022100",
			"0011200",
			"0012120",
			"0221211",
		 ])
		var p= IA.p4BlockEasy(5,true)
		assert.ok(p != 39);
		assert.ok(p != 26);
		});
			
		QUnit.test("joueEn24", function(assert){
		Modele.setModel( [
        "0000000",
        "0000000",
        "0000000",
        "0000000",
        "0000100",
        "2011220",
        ])
		assert.ok(IA.p4BlockEasy(32,true) == 30);
		});
			
		QUnit.test("joueEn24", function(assert){
		Modele.setModel(
		  [
        "0120200",
        "0210100",
        "0120202",
        "1220101",
        "2212102",
        "1121211",
        ])
		assert.ok(IA.p4BlockEasy(0,true) != 24);
		});
		

		QUnit.test("joueEn24", function(assert){
		Modele.setModel(
		[
        "2020100",
        "1010100",
        "2010100",
        "2210200",
        "1222100",
        "1121220",
      ])
		assert.ok(IA.p4BlockEasy(0,true) == 24);
		});
		QUnit.test("test", function(assert){
			Modele.setModel([
			"0000000",
			"0020100",
			"0012200",
			"0021100",
			"0212100",
			"1121220",
			])
			assert.ok(IA.p4BlockEasy(1,true) == 10);
		});
		QUnit.test("test", function(assert){
			Modele.setModel([
			"0100000",
			"0202100",
			"0112200",
			"0221100",
			"0212100",
			"1121220",
			])
			assert.ok(IA.p4BlockEasy(1,true) == 9);
		});
		
		QUnit.test("test", function(assert){
			Modele.setModel([
			"0011200",
			"0222100",
			"0112200",
			"0221100",
			"1212100",
			"1121220",
			])
			assert.ok(IA.p4BlockEasy(1,true) == 21);
		});

		
		QUnit.test("test", function(assert){
			Modele.setModel(
			[
			"0011200",
			"0022100",
			"0012200",
			"0021100",
			"0212100",
			"1121220",
			])
			assert.ok(IA.p4BlockEasy(4,true) != 41);
		});
		
		
		/*QUnit.test("shouldBe", function(assert){
		 	assert.ok(IA.testerSiContenu3(4,6) == 3);
		}); 
		QUnit.test("shouldBe", function(assert){
		 	assert.ok(IA.testerSiContenu3(4,42) == 38);
		}); 
		QUnit.test("shouldBe", function(assert){
		 	assert.ok(IA.testerSiContenu3(4,3) == 2);
		}); 
		QUnit.test("shouldBe", function(assert){
		 	assert.ok(IA.testerSiContenu3(1,6) == 5);
		}); 
		QUnit.test("shouldBe", function(assert){
		 	assert.ok(IA.testerSiContenu3(6,5) == 1);
		}); 
		*/
QUnit.test("shouldBe", function(assert){
			Modele.setModel([
			"0002000",
			"0001000",
			"0202000",
			"0101000",
			"0102012",
			"0121221",
	 ])
		 	assert.ok(IA.p4BlockEasy(6,true) != 26);
		}); 
		
		QUnit.test("shouldBe", function(assert){
			Modele.setModel([
			"0000000",
			"0000000",
			"0002010",
			"0001021",
			"0002012",
			"0001122",
			])
			assert.ok(IA.p4BlockEasy(3,true) == 10);
		})
		
		QUnit.test("shouldBe", function(assert){
		Modele.setModel([
        "0120200",
        "0210100",
        "2120200",
        "1220100",
        "2212100",
        "1121211",
        ])
		assert.ok(IA.p4BlockEasy(6,true) != 33);
		})

		
QUnit.test("shouldBe", function(assert){
			Modele.setModel([
        "0000000",
        "0000011",
        "0012012",
        "0022021",
        "0021012",
        "0211122",
	 ])
		 	assert.ok(IA.p4BlockEasy(3,true) == 35);
		});  
	 QUnit.test("shouldBe", function(assert){
		Modele.setModel(
			[
        "0000000",
        "0000000",
        "0002000",
        "0021000",
        "0211120",
        "1121220",
        ])
		 	assert.ok(IA.p4BlockEasy(6,true) == 10);
	}); 
		
	 QUnit.test("shouldBe", function(assert){
		Modele.setModel([
			"0000000",
			"0000000",
			"0001010",
			"0002120",
			"0001212",
			"0021212",
			]
		)
		assert.ok(IA.p4BlockEasy(6,true) == 18);
	}); 
	
		
		
	QUnit.test("shouldBe", function(assert){
		Modele.setModel(
			[
			"1120000",
			"2210000",
			"1122000",
			"2221000",
			"1212102",
			"1121201",
		   ])
		 	assert.ok(IA.p4BlockEasy(6,true) != 40);
		}); 
		QUnit.test("shouldBe", function(assert){
		Modele.setModel(
			[
			"0121100",
			"0212200",
			"0222100",
			"0111202",
			"0121201",
			"1121202",
			])
		 	assert.ok(IA.p4BlockEasy(6,true) == 20);
		}); 
		QUnit.test("shouldBe", function(assert){
		Modele.setModel(
			[
			"0102000",
			"0202000",
			"1101000",
			"2201100",
			"2122200",
			"2111201",
			])
		 	assert.ok(IA.p4BlockEasy(3,true) != 18);
		}); 
		QUnit.test("shouldBe", function(assert){
		Modele.setModel(
			[
			"0120200",
			"2210100",
			"2120200",
			"1220100",
			"2212110",
			"1121211",
			])
        	assert.ok(IA.p4BlockEasy(3,true) == 26);
		}); 
		
		QUnit.test("shouldBe", function(assert){
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
		assert.ok(IA.p4BlockEasy(0,true) == 24);
		}); 
		QUnit.test("shouldBe", function(assert){
			Modele.setModel(
			[
			"0002000",
			"0002000",
			"1101000",
			"2201100",
			"2122200",
			"2111201",
			])
		 	assert.ok(IA.p4BlockEasy(2,true) != 18);
		}); 
		QUnit.test("shouldBe", function(assert){
			Modele.setModel(
			[
			"0000000",
			"0002000",
			"0101000",
			"0201100",
			"0102200",
			"2101220",
			])
		 	assert.ok(IA.p4BlockEasy(6,true) == 33);
		}); 
		
		QUnit.test("shouldBe", function(assert){
			Modele.setModel(
			[
			"0000000",
			"0000000",
			"0201000",
			"0201100",
			"0102200",
			"2101200",
		   ])
		 	assert.ok(IA.p4BlockEasy(6,true) == 10);
		}); 
		QUnit.test("shouldBe", function(assert){
			Modele.setModel(
			[
			"0102000",
			"0201200",
			"0202100",
			"0201120",
			"0101210",
			"0201120",
			])
		 	assert.ok(IA.p4BlockEasy(6,true) == 19);
		}); 
		
		QUnit.test("shouldBe", function(assert){
					Modele.setModel(
					[
        "0020120",
        "0010210",
        "0010220",
        "0020110",
        "0010122",
        "2021112",
           ])
		 	assert.ok(IA.p4BlockEasy(6,true) == 28);
		}); 

		QUnit.test("shouldBe", function(assert){
					Modele.setModel(
					[
			        "0001000",
			        "0002020",
			        "0022010",
			        "0011010",
			        "0022010",
			        "0021120",
             		])
    	 			assert.ok(IA.p4BlockEasy(6,true) == 9);
		}); 

		QUnit.test("shouldBe", function(assert){
					Modele.setModel(
					[
			        "0000000",
			        "0002000",
			        "0002000",
			        "0001010",
			        "0002010",
			        "0001020",
			        ])
		 	assert.ok(IA.p4BlockEasy(6,true) != 19);
		 })


		QUnit.test("shouldBe", function(assert){
			Modele.setModel(
			[
	        "0101122",
	        "0202111",
	        "0201221",
	        "1201122",
	        "2102211",
	        "1221122",
	        ])
		 	assert.ok(IA.p4BlockEasy(6,true) == 14);
		});


		QUnit.test("shouldBe", function(assert){
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
		 	assert.ok(IA.p4BlockEasy(6,true) == 16);
		}); 

			QUnit.test("shouldBe", function(assert){
				Modele.setModel(
				[
		        "0022002",
		        "1012001",
		        "2022002",
		        "1021001",
		        "1212101",
		        "1121221",
		        ])
		 	assert.ok(IA.p4BlockEasy(6,true) == 0);
		});  
		QUnit.test("shouldBe", function(assert){
				Modele.setModel(
				[
		        "0001000",
		        "2002101",
		        "2012202",
		        "1021101",
		        "1212102",
		        "1121222",
		 ])
		 	assert.ok(IA.p4BlockEasy(6,true) == 9);
		}); 
		QUnit.test("shouldBe", function(assert){
			Modele.setModel(
				[
		        "0000000",
		        "0001000",
		        "0001120",
		        "0002120",
		        "0001210",
		        "0001222",
		        ])
		 	assert.ok(IA.p4BlockEasy(13,true) == 11);
		}); 

		QUnit.test("shouldBe", function(assert){
				Modele.setModel(
				[
        "0000000",
        "0000000",
        "0001000",
        "0002100",
        "0001210",
        "0001222",
     	 ])
		 	assert.ok(IA.p4BlockEasy(11,true) == 10);
		}); 
        QUnit.test("shouldBe", function(assert){
				Modele.setModel(
				[
		        "0000000",
		        "0021000",
		        "0012200",
		        "0211100",
		        "0212200",
		        "1121200",
		         ])
		 	assert.ok(IA.p4BlockEasy(2,true) == 3);
		}); 

		QUnit.test("shouldBe", function(assert){
				Modele.setModel(
				[
		        "0001000",
		        "0002100",
		        "0012200",
		        "0021100",
		        "1212102",
		        "1121222",
		        ])
		 	assert.ok(IA.p4BlockEasy(6,true) == 21);
		}); 

		QUnit.test("shouldBe", function(assert){
				Modele.setModel(
				[
		        "0000000",
		        "0022000",
		        "0022000",
		        "0011000",
		        "0012100",
		        "0121102",
		        ])
		 	assert.ok(IA.p4BlockEasy(4,true) != 25);
		}); 

		QUnit.test("shouldBe", function(assert){
				Modele.setModel(
				[
		        "0000000",
		        "0000000",
		        "0000200",
		        "0020100",
		        "0012100",
		        "0021102",
		     	 ])
			assert.ok(IA.p4BlockEasy(4,true) == 24);
		});

		QUnit.test("shouldBe", function(assert){
					Modele.setModel(
					[
			        "0010200",
			        "0020100",
			        "0020200",
			        "0020110",
			        "0012120",
			        "0021112",
			       ])
			assert.ok(IA.p4BlockEasy(2,true) == 24);
		});

		QUnit.test("shouldBe", function(assert){
				Modele.setModel(
				[
		        "0010200",
		        "0020100",
		        "0020220",
		        "0020110",
		        "0010120",
		        "0021112",
				])
					assert.ok(IA.p4BlockEasy(2,true) == 34);
		});

		QUnit.test("shouldBe", function(assert){
					Modele.setModel(
					[
		        "0000000",
		        "0000000",
		        "0000000",
		        "0020000",
		        "0010000",
		        "0021102",
		      ])
					assert.ok(IA.p4BlockEasy(2,true) == 32);
		});

		QUnit.test("shouldBe", function(assert){
					Modele.setModel(
					[
					"0000000",
					"0120100",
					"0212200",
					"0211100",
					"0212200",
					"1121200",
					])
					assert.ok(IA.p4BlockEasy(3,true) != 10);
		});

		QUnit.test("shouldBe", function(assert){
			Modele.setModel([
				"0000000",
				"0001000",
				"0002000",
				"0201000",
				"0202100",
				"0101200",
			])
			assert.ok(IA.p4BlockEasy(5,true) == 15);
		});

		QUnit.test("shouldBe", function(assert){
			Modele.setModel([
			"0000000",
			"0210000",
			"0122000",
			"0221010",
			"0212120",
			"1121210",
			])
			assert.ok(IA.p4BlockEasy(5,true) == 19);
		});

		QUnit.test("shouldBe", function(assert){
			Modele.setModel([
			"0000000",
			"0000000",
			"0020000",
			"0011021",
			"0012012",
			"0121122",
			])
			assert.ok(IA.p4BlockEasy(5,true) == 17);
		});
		
		QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(4,true) == 26);
		});

		QUnit.test("shouldBe", function(assert){
			Modele.setModel([
		"0000000",
		"0000020",
		"0000010",
		"0000020",
		"0000010",
		"0001122",
  ])
	      	assert.ok(IA.p4BlockEasy(0,true) == 37);
		});

		QUnit.test("shouldBe", function(assert){
			Modele.setModel([
		        "0000000",
		        "0000000",
		        "0000000",
		        "0000000",
		        "0000000",
		        "2001000",
	        ])
	      	assert.ok(IA.p4BlockEasy(0,true) == 37);
		});

		QUnit.test("shouldBe", function(assert){
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
		assert.ok(IA.p4BlockEasy(0,true) == 18);
		});

		QUnit.test("shouldBe", function(assert){
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
		assert.ok(IA.p4BlockEasy(3,true) == 24);
		});

		QUnit.test("shouldBe", function(assert){
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
				assert.ok(IA.p4BlockEasy(0,true) == 34);
		});

		QUnit.test("shouldBe", function(assert){
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
				assert.ok(IA.p4BlockEasy(5,true) == 10);
		});
		
		QUnit.test("shouldBe", function(assert){
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
				assert.ok(IA.p4BlockEasy(5,true) == 34);
		});
		
		QUnit.test("shouldBe", function(assert){
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
				assert.ok(IA.p4BlockEasy(5,true) == 19);
		});
		QUnit.test("shouldBe", function(assert){
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
				assert.ok(IA.p4BlockEasy(1,true) == 16);
		});
		QUnit.test("shouldBe", function(assert){
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
				assert.ok(IA.p4BlockEasy(1,true) == 11);
		});
		
		QUnit.test("shouldBe", function(assert){
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
				assert.ok(IA.p4BlockEasy(2,true) == 29);
		});
		QUnit.test("shouldBe", function(assert){
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
				assert.ok(IA.p4BlockEasy(1,true) == 18);
		});
		QUnit.test("shouldBe", function(assert){
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
				assert.ok(IA.p4BlockEasy(2,true) == 36);
		});
		
		QUnit.test("shouldBe", function(assert){
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
				assert.ok(IA.p4BlockEasy(2,true) == 35);
		});

		QUnit.test("shouldBe", function(assert){
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
				assert.ok(IA.p4BlockEasy(1,true) == 23);
		});
		
		QUnit.test("shouldBe", function(assert){
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
				assert.ok(IA.p4BlockEasy(2,true) == 19);
		});
		QUnit.test("shouldBe", function(assert){
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
				assert.ok(IA.p4BlockEasy(2,true) != 16);
		});
		
		QUnit.test("shouldBe", function(assert){
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
				assert.ok(IA.p4BlockEasy(2,true) == 18);
		});
			
	
	QUnit.test("shouldBe", function(assert){
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
		assert.ok(IA.p4BlockEasy(2,true) == 31);
	});
	QUnit.test("shouldBe", function(assert){
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
		assert.ok(IA.p4BlockEasy(2,true) != 31);
	});
	
	QUnit.test("shouldBe", function(assert){
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
	assert.ok(IA.p4BlockEasy(2,true) == 34);
	});
	QUnit.test("shouldBe", function(assert){
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
	assert.ok(IA.p4BlockEasy(2,true) != 22);
	});
		
	QUnit.test("shouldBe", function(assert){
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
		assert.ok(IA.p4BlockEasy(2,true) == 34);
		});
		
		
		QUnit.test("shouldBe", function(assert){
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
		assert.ok(IA.p4BlockEasy(2,true) == 9);
		});
		
		QUnit.test("shouldBe", function(assert){
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
		assert.ok(IA.p4BlockEasy(4,true) == 16);
		});
			QUnit.test("shouldBe", function(assert){
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
		assert.ok(IA.p4BlockEasy(4,true) == 11);
		});
		
	
		QUnit.test("shouldBe", function(assert){
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
		assert.ok(IA.p4BlockEasy(4,true) == 9);
		});
		QUnit.test("shouldBe", function(assert){
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
		assert.ok(IA.p4BlockEasy(4,true) == 25);
		});
		QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(4,true) == 32);
		});
		QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(4,true) != 36);
		});
		
		QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(4,true) == 41);
		});
		QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(1,true) != 40);
		});
		
		
		QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(2,true) != 25);
		});
		
		QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(2,true) != 40);
			assert.ok(IA.p4BlockEasy(2,true) != 25);
		});
		
		QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(2,true) == 11);
		});
		
		QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(2,true) == 40);
		});
	QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(2,true) == 26);
		});
		QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(2,true) == 22);
		});
		QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(2,true) == 14);
		});
		QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(2,true) == 13);
		});
		
		QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(2,true) != 39);
		});
		
		QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(2,true) == 34);
		});
		
		QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(2,true) != 20);
		});
		
		QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(6,true) == 31);
		});
		
		QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(4,true) == 34);
		});
		
		QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(6,true) == 40);
		});
		QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(6,true) == 11);
		});
		QUnit.test("shouldBe", function(assert){
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
		assert.ok(IA.p4BlockEasy(6,true) != 30);
		});
		
		QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(6,true) != 34);
		});
		
		QUnit.test("shouldBe", function(assert){
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
			assert.ok(IA.p4BlockEasy(6,true) == 13);
		});
		
		
		QUnit.test("shouldBe2", function(assert){
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
		assert.ok(IA.p4BlockEasy(2,true) != 40);
		});
		
		QUnit.test("shouldBe2", function(assert){
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
		assert.ok(IA.p4BlockEasy(4,true) == 16);
		});
		
		QUnit.test("shouldBe40", function(assert){
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
		assert.ok(IA.p4BlockEasy(1,true) == 40);
		});
		
	
 
		
		QUnit.test("shouldBe2", function(assert){
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
		assert.ok(IA.p4BlockEasy(4,true) == 2);
		});
		
		
		QUnit.test("shouldBe14", function(assert){
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
		assert.ok(IA.p4BlockEasy(6,true) == 14);
		});
		
		QUnit.test("shouldBe14", function(assert){
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
		assert.ok(IA.p4BlockEasy(6,true) == 14);
		});
		
		QUnit.test("shouldBe14", function(assert){
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
		assert.ok(IA.p4BlockEasy(39,true) == 28);
		});
		
		
		
		QUnit.test("shouldBe16", function(assert){
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
		assert.ok(IA.p4BlockEasy(3,true) == 16);
		});


		QUnit.test("shouldBe25", function(assert){
		Modele.setModel(
		[
		"0002000",
		"0001000",
		"0012000",
		"0021000",
		"0012220",
		"1121120",
		])
		assert.ok(IA.p4BlockEasy(5,true) == 25);
		});
		
		QUnit.test("PlayAt22", function(assert){
		Modele.setModel(
		[
        "0020211",
        "0010122",
        "0010211",
        "0020222",
        "0210121",
        "2121211",
        ])
		assert.ok(IA.p4BlockEasy(3,true) == 28);
		});
		
		QUnit.test("PlayAt40", function(assert){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0000000",
        "0020000",
        "0210000",
        "1121200",
        ])
		assert.ok(IA.p4BlockEasy(3,true) == 32);
		});
		
		
		QUnit.test("PlayAt26", function(assert){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0000000",
        "0020200",
        "0010120",
        "0021211",
        ])
		assert.ok(IA.p4BlockEasy(3,true) == 16);
		});
		
	
		QUnit.test("PlayAt26", function(assert){
		Modele.setModel(
		[
        "0000000",
        "0000002",
        "0012001",
        "0021001",
        "0012021",
        "1021022",
        ])		
		assert.ok(IA.p4BlockEasy(1,true) == 26);
		
		});
		QUnit.test("PlayAt27", function(assert){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0012000",
        "0021000",
        "0012001",
        "0021002",
        ])	
		assert.ok(IA.p4BlockEasy(1,true) == 27);
		});
		
		QUnit.test("PlayAt21", function(assert){
		Modele.setModel(
		[
        "0011001",
        "0222002",
        "0112001",
        "0221002",
        "1212101",
        "1121222",
      ])	
		assert.ok(IA.p4BlockEasy(1,true) == 21);
		});
		
		QUnit.test("notPlayAt25", function(assert){
		Modele.setModel(
		[
        "0011001",
        "0022002",
        "0012001",
        "0021002",
        "0012101",
        "1021222",
       ])	
		assert.ok(IA.p4BlockEasy(16,true) == 36);
		});
		
		QUnit.test("notPlayAt22", function(assert){
		Modele.setModel(
		[
        "0010210",
        "0020110",
        "0020111",
        "2020221",
        "2210122",
        "1121221",
	])	
		assert.ok(IA.p4BlockEasy(15,true) != 22);
		});
		
		QUnit.test("jouepasen10", function(assert){
		Modele.setModel(
		[
        "0021120",
        "0012210",
        "0021120",
        "0122210",
        "0211120",
        "1121222",
    ])	
		assert.ok(IA.p4BlockEasy(0,true) == 15);
		});
		
		QUnit.test("joueEn24", function(assert){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0000100",
        "0020200",
        "0210120",
        "1121220",
    ])	
		assert.ok(IA.p4BlockEasy(0,true) != 26);
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
		
		QUnit.test("shouldBeAt19", function(assert){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0020100",
        "0020220",
        "0210210",
        "1121211",
      ])	
		assert.ok(IA.p4BlockEasy(33,true) == 19);
		});
		
		QUnit.test("shouldNotBeAt37", function(assert){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0020100",
        "0020200",
        "0210210",
        "1121211",
        ])	
		assert.ok(IA.p4BlockEasy(33,true) != 37);
		});
		

	
		QUnit.test("shouldBeAt19", function(assert){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0000000",
        "0021020",
        "0212221",
        "1121211",
        ])	
		assert.ok(IA.p4BlockEasy(33,true) == 19);
		});
		QUnit.test("shouldBeAt27", function(assert){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0012000",
        "0021000",
        "0212221",
        "1121211",
        ])	
		assert.ok(IA.p4BlockEasy(33,true) == 27);
		});
		
		QUnit.test("shouldBeAt26", function(assert){
		Modele.setModel(
		[
        "1000000",
        "1000100",
        "2000200",
        "1101200",
        "1202112",
        "2101222",
        ])	
		assert.ok(IA.p4BlockEasy(33,true) == 26);
		});
		
		QUnit.test("shouldBeAt26", function(assert){
		Modele.setModel(
		[
        "1000000",
        "1000100",
        "2000200",
        "1101200",
        "1202112",
        "2101222",
        ])	
		assert.ok(IA.p4BlockEasy(33,true) == 26);
		});
		
		QUnit.test("shouldNotBeAt33", function(assert){
		Modele.setModel(
		[
        "1000000",
        "1000100",
        "2000200",
        "1101200",
        "1202102",
        "2101222",
        ])	
		assert.ok(IA.p4BlockEasy(33,true) != 26);
		});
		
		QUnit.test("shouldBeAt32", function(assert){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "1100000",
        "2100000",
        "1202000",
        "2101202"
		])	
		assert.ok(IA.p4BlockEasy(33,true) == 32);
		});
		
		
		QUnit.test("shouldnNotBeAt26", function(assert){
		Modele.setModel(
		[
        "0002000",
        "0001100",
        "0001100",
        "0001200",
        "2202122",
        "2101212",
        ])	
		assert.ok(IA.p4BlockEasy(33,true) != 26);
		});
		
		QUnit.test("shouldnNotBeAt41", function(assert){
		Modele.setModel(
		[
        "0012000",
        "0021000",
        "0012000",
        "0211000",
        "0212020",
        "0121120",
        ])	
		assert.ok(IA.p4BlockEasy(33,true) != 41);
		});
		
		
		QUnit.test("shouldnNotBeAt40", function(assert){
		Modele.setModel(
		[
		"0010000",
		"0020000",
		"0022000",
		"0021000",
		"0212100",
		"1121201"
        ])	
		assert.ok(IA.p4BlockEasy(33,true) != 40);
		});
		
		QUnit.test("shouldBeAt32", function(assert){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0020000",
        "0020000",
        "0210000",
        "1121201",
       ])	
		assert.ok(IA.p4BlockEasy(33,true) == 32);
		});
		
		QUnit.test("shouldBeAt32bis", function(assert){
		Modele.setModel(
		[
        "0002000",
        "0021000",
        "0012000",
        "0211000",
        "0212000",
        "0121120",
        ])	
		assert.ok(IA.p4BlockEasy(33,true) == 32);
		});
		
		QUnit.test("shouldBeAt33", function(assert){
		Modele.setModel(
		[
        "0221000",
        "0122000",
        "0211000",
        "0122001",
        "0121002",
        "0121211",
        ])	
		assert.ok(IA.p4BlockEasy(33,true) == 33);
		});
		
		QUnit.test("shouldBeAt18", function(assert){
		Modele.setModel(
		[
        "0100000",
        "0210000",
        "0120000",
        "0220200",
        "0210100",
        "1121200",
        ])	
		assert.ok(IA.p4BlockEasy(18,true) == 18);
		});
		
		QUnit.test("shouldBeAt11", function(assert){
		Modele.setModel(
		[
        "0000000",
        "0110000",
        "0120200",
        "0221100",
        "2212120",
        "1121221",
        ])	
		assert.ok(IA.p4BlockEasy(18,true) == 11);
		});
		
		QUnit.test("shouldBeAt31", function(assert){
		Modele.setModel(
		[
        "0000000",
        "0210000",
        "0120000",
        "0220000",
        "0210100",
        "1121200",
        ])	
		assert.ok(IA.p4BlockEasy(9,true) != 31);
		});
		
		  
		
		QUnit.test("shouldBe3", function(assert){
		Modele.setModel(
		[
        "0000000",
        "0001000",
        "0102100",
        "0201200",
        "0102200",
        "2101200",
        ])	
		assert.ok(IA.p4BlockEasy(0,true) == 3);
		});
		QUnit.test("19shouldNotToBeForbiden", function(assert){
		Modele.setModel(
        [
        "0201100",
        "0201100",
        "0102100",
        "0201220",
        "0102210",
        "2101221",
       ])	
		assert.ok(IA.p4BlockEasy(26,true) == 19);
		});
		
	
		QUnit.test("shoulBeAt3", function(assert){
		Modele.setModel(
        [
        "0100000",
        "0211000",
        "0122000",
        "0221000",
        "0212100",
        "1121200",
        ])	
		assert.ok(IA.p4BlockEasy(8,true) == 3);
		});
		
		QUnit.test("shouldBe21", function(assert){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0020000",
        "0010000",
        "1222100",
        "1121200",
          ])	
		assert.ok(IA.p4BlockEasy(24,true) == 24);
		});
		
		QUnit.test("shouldBe12", function(assert){
		Modele.setModel(
		[
        "0002000",
        "0021100",
        "0012210",
        "0221120",
        "0212120",
        "1121120",
          ])
		assert.ok(IA.p4BlockEasy(22,true) == 12);
		});
		
	    QUnit.test("bloquerTroisEnLigneEn41", function(assert){
			Modele.setGrille(
			[0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,
			0,0,1,2,2,2,0,
			]);
			assert.ok(IA.p4BlockEasy(0,true) == 41);
		});
		

		QUnit.test("shouldNotBe2428", function(assert){
		Modele.setModel(
		[
        "0100000",
        "0200000",
        "0110010",
        "0220020",
        "0212220",
        "1121210",
          ])
		assert.ok(IA.p4BlockEasy(0,true) != 28);
		assert.ok(IA.p4BlockEasy(3,true) != 24);
		});
		
		
		QUnit.test("jouerEn32", function(assert){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0000000",
        "0021000",
        "0012000",
        "0121200",
          ])
		assert.ok(IA.p4BlockEasy(0,true) == 32);
		});
		
		
		QUnit.test("jouePasEn21", function(assert){
		Modele.setModel(
		[
        "0000000",
        "0110000",
        "0220000",
        "0210000",
        "1210200",
        "1121220",
          ])
		assert.ok(IA.p4BlockEasy(0,true) != 21);
		});
		////
		
		QUnit.test("doubleDiagoEn26", function(assert){
		Modele.setModel(
		[
        "0011000",
        "0022000",
        "0011000",
        "0021000",
        "2212121",
        "1121222",
          ])
		assert.ok(IA.p4BlockEasy(0,true) == 26);
		});
		
		QUnit.test("doubleDiagoEn26bis", function(assert){
		Modele.setModel(
	    [
        "0012000",
        "0222000",
        "0121000",
        "0221000",
        "1212120",
        "2111210",
          ])
		assert.ok(IA.p4BlockEasy(0,true) == 26);
		});
				
		
		

		
		QUnit.test("gameOver", function(assert){
		Modele.setModel(
		[
        "0000000",
        "0080000",
        "1802001",
        "8128318",
        "4218188",
        "2421888",
       ])
		assert.ok(Modele.weHaveAWinner(14)).toBe(true);
		assert.ok(Modele.weHaveAWinner(27)).not.toBe(true);
		assert.ok(Modele.weHaveAWinner(20)).toBe(true);
		assert.ok(Modele.weHaveAWinner(29)).toBe(true);
		assert.ok(Modele.weHaveAWinner(29)).toBe(true);

		});
			
		QUnit.test("shouldnotBe40", function(assert){
		Modele.setModel(
		[
        "1201100",
        "2202100",
        "1101200",
        "1201100",
        "2102200",
        "2121202",
         ])
		assert.ok(IA.p4BlockEasy(40) != 40);
		});
		
		QUnit.test("winIn2", function(assert){
		Modele.setModel(
		[
        "0000000",
        "0000000",
        "0000000",
        "0201100",
        "0202100",
        "1121200",
          ])
		assert.ok(IA.p4BlockEasy(17,true)%7 == 18%7);
		});
		
		QUnit.test("shoudNotSucideAt32", function(assert){
		Modele.setModel(
		[
        "0022020",
        "0011010",
        "0022010",
        "0011020",
        "0012021",
        "0121122",
     ])
		assert.ok(IA.p4BlockEasy(17,true) != 32);
		});
		

		QUnit.test("shouldDontHelpAt18", function(assert){
		Modele.setModel(
		[
        "0011010",
        "0022020",
        "0012110",
        "0021220",
        "2012210",
        "1021120",
         ])
		assert.ok(IA.p4BlockEasy(4,true) != 18);
		});
		
		QUnit.test("shouldBeAt17", function(assert){
		Modele.setModel(
		[
        "0000006",
        "0000000",
        "0000000",
        "0101100",
        "2202100",
        "2101200",
        ])
		assert.ok(IA.p4BlockEasy(4,true) == 17);
		});
		QUnit.test("shouldNotBeAt18", function(assert){
		Modele.setModel(
		[
        "0022000",
        "0111000",
        "0112000",
        "1222110",
        "2212220",
        "1121210",
        ])
		assert.ok(IA.p4BlockEasy(4,true) != 18);
		});
		
		