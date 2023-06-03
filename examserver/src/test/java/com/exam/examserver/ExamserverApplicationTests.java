package com.exam.examserver;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
class ExamserverApplicationTests {

	private int doSum(int a, int b){
		return a+b;
	}

	@Test
	void contextLoads() {
	}

	@Test
	void testSum(){
		int expectedResult = 10;
		int actualResult = doSum(2, 8);
		assertThat(actualResult).isEqualTo(expectedResult);
	}

}
