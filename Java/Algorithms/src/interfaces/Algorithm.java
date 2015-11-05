package interfaces;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

public interface Algorithm {
	public void Insert(Object obj, int value);
	public void Print(Object obj); 
	public void Sort(File input, File output) throws FileNotFoundException, IOException;	
}
