package sort;
import interfaces.* ;

public class BinaryTree implements Algorithm {

	static class Node {
		
		Node right;
		Node left;
		int value;
		
		public Node(int value){
			this.value = value;
		}
		
	}
	
	Node root ;
	
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
			System.out.println(" Traversed " + node.value);
			Print(node.right);
		}
		
	}
	
}
