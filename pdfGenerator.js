// playground requires you to assign document definition to a variable called dd

var dd = {
	content: [
	    {
			text: 'Quiz Attempt Report',
			style: 'header',
			alignment: 'center'
		},
		{
		    style: 'info_table',
		    table: {
		        widths: [140,'*', '*', '*'],
				body: [
					[
						{
    	                    text: 'Quiz Title ',
                            style: 'subheader'         
    	                },
					    {
					        colSpan: 3,
            	            text: 'Database Engineering',
            	            style: 'subheader_notbold'
            	        },
            	        {},{}
					],
					[
						{
    	                    text: 'Quiz Description ',
                            style: 'subheader'         
    	                },
					    {
					        colSpan: 3,
            	            text: 'Database Engineering quiz for students learning DBMS subject as part of their curriculum',
            	            style: 'subheader_2'
            	        },
            	        {},{}
					],
					[
						{
    	                    text: 'Student ',
                            style: 'subheader'         
    	                },
					    {
					        colSpan: 3,
            	            text: 'Veet Moradiya',
            	            style: 'subheader_2'
            	        },
            	        {},{}
					],
					[
						{
    	                    text: 'Score ',
                            style: 'subheader'         
    	                },
					    {
            	            text: '100',
            	            style: 'subheader_2'
            	        },
            	        {
    	                    text: 'Total Score ',
                            style: 'subheader'         
    	                },
					    {
            	            text: '100',
            	            style: 'subheader_2'
            	        }
					],
					[
						{
    	                    text: 'Start time ',
                            style: 'subheader'         
    	                },
					    {
            	            text: '',
            	            style: 'subheader_2'
            	        },
            	        {
    	                    text: 'Completion time ',
                            style: 'subheader'       
    	                },
					    {
            	            text: '',
            	            style: 'subheader_2'
            	        }
					],
					[
					    {
					        text: 'Total Questions',
					        style: 'subheader'
					    },
					    {
					        text: '20',
					        style: 'subheader_2'
					    },
					    {
					        text: 'Attempted Questions',
					        style: 'subheader'
					    },
					    {
					        text: '12',
					        style: 'subheader2'
					    }
					],
					[
					    {
					        text: 'Correct Questions',
					        style: 'subheader'
					    },
					    {
					        text: '9',
					        style: 'subheader_2'
					    },
					    {
					        text: 'Wrong Questions',
					        style: 'subheader'
					    },
					    {
					        text: '3',
					        style: 'subheader2'
					    }
					]
				]
			},
			layout: {
				defaultBorder: true,
			},
		},
		{
		    text: 'Questions',
		    style: 'question_header'
		},
	    {
		    style: 'question_table',
		    widths: ['*', '*', '*', '*', '*', '*'],
		    table: {
				body: [
					[
						{
						    colSpan: 6,
    	                    text: 'Q. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Placerat in egestas erat imperdiet. Suspendisse faucibus interdum posuere lorem ipsum',
                            style: 'question_title'         
    	                },
					    {},{},{},{},{}
					],
					[
					    {
					        text: 'Score : ',
					    },
					    {
					        text: 10
					    },
					    {
					        text: 'Attempt Status : '
					    },
					    {
					        text: 'correct'
					    },
					    {
					        text: 'Question Type : '
					    },
					    {
					        text: 'single correct'
					    }
					],
					[
					    {
					        colSpan: 6,
					        text: 'Options : '
					    },{},{},{},{},{}
					],
					[
					    {
					        colSpan: 6,
					        text: 'A. it amet venenatis urna cursus eget'
					    },
					    {},{},{},{},{}
					],
					[
					    {
					        colSpan: 6,
					        text: 'B. it amet venenatis urna cursus eget'
					    },
					    {},{},{},{},{}
					],
					[
					    {
					        colSpan: 6,
					        text: 'C. it amet venenatis urna cursus eget'
					    },
					    {},{},{},{},{}
					],
					[
					    {
					        colSpan: 6,
					        text: 'D. it amet venenatis urna cursus eget'
					    },
					    {},{},{},{},{}
					],
					[
					    {
					        colSpan: 6,
					        text: 'E. it amet venenatis urna cursus eget'
					    },
					    {},{},{},{},{}
					],
					[
					   {
					        colSpan: 2,
					        text: 'Selected Options: '
				       },
					   {},
					   {
					       colSpan: 4,
					       text: '12345',
					   },{},{},{}
					]
				]
			},
			layout: {
				defaultBorder: false,
			},
		},
	],
    styles: {
        header : {
            fontSize: 18,
            bold: true
        },
        subheader: {
			fontSize: 11,
			bold: true
		},
		subheader_2: {
		    fontSize: 11,
		},
		subheader_notbold : {
		    fontSize: 15,
		},
		quote: {
			italics: true
		},
		small: {
			fontSize: 8
    	},
    	info_table: {
    	    margin: [0, 10]
    	},
    	question_header: {
    	    fontSize: 16,
    	    bold: true,
    	    alignment: 'center'
    	},
    	question_table: {
    	    
    	}
    }
}