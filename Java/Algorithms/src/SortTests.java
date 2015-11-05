import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

import interfaces.*;
import sort.*;

public class SortTests {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		File input = new File("data/input.txt");
		File output = new File("data/output_binarytree.txt"); 
		
		System.out.println("-------------------------------------");
		System.out.println("--- Binary Tree");
		System.out.println("-------------------------------------");
		System.out.println("");		
		System.out.println("Starting at " + System.nanoTime());
		
		long currentNano = System.nanoTime();
		
		Algorithm algo = new BinaryTree();
		
		try {
			//Loads + process using binary tree
			algo.Sort(input, output);
			
			currentNano = System.nanoTime() - currentNano;
			
			System.out.println("");
			System.out.println("Finished at " + System.nanoTime());
			System.out.println("Time taken to sort = " + currentNano);
			System.out.println("");
			System.out.println("Created file " + output.getPath());					
					
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			System.out.println("");
			System.out.println("END");
			System.out.println("-------------------------------------");
			System.out.println("");			
		}		
	}

}
