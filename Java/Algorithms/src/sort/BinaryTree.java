package sort;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Scanner;

import interfaces.* ;

public class BinaryTree implements Algorithm {

	Node root ;	
	StringBuilder content = new StringBuilder();
	
	static class Node {
		
		Node right;
		Node left;
		int value;
		
		public Node(int value){
			this.value = value;
		}
		
	}

	public BinaryTree(){		
	}

	@Override
	public void Insert(Object obj, int value){
		
		Node node = (Node)obj;
		
		//Check whether or not this node is the first one
		if (root != null){			
			if (value < node.value){				
				if (node.left != null){
					Insert(node.left, value);									
				} else {
				    node.left = new Node(value);
				}
			} else if (value > node.value) {				
				if (node.right != null)
					Insert(node.right, value);
				else { 
					node.right = new Node(value);
				}
			}		
		} else {
			//Initializes the root with the first value
			root = new Node(value);
		}		
	}

	@Override
	public void Print(Object obj) {
		Node node = (Node)obj;
		
		if (node != null){
			Print(node.left);
			content.append(node.value + "\n");			
			Print(node.right);
		}
		
	}
	
	@Override
	public void Sort(File input, File output) throws IOException{
		
		Scanner s = new Scanner(input);
				
		while (s.hasNext()){
			Insert(this.root, s.nextInt());
		}
		s.close();
		
		Print(this.root);
		
		Files.write(Paths.get(output.getPath()), content.toString().getBytes(), StandardOpenOption.CREATE);
		
		
	}
	
}
