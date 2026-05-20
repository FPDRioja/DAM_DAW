package bicicletas.arrays;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class Tests {

	@Test
	void test() {
		
		assertEquals(BicicletaElectrica.indiceId, 0 ); 
	}
	
	@Test
	void test2() {
		BicicletaElectrica a = new BicicletaElectrica();
		assertEquals(BicicletaElectrica.indiceId, 1 ); 
	}

}
