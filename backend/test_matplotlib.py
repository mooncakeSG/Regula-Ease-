#!/usr/bin/env python3
"""
Test script to diagnose matplotlib issues
"""

def test_matplotlib_step_by_step():
    """Test matplotlib imports and functionality step by step"""
    
    print("=" * 50)
    print("Matplotlib Diagnostic Test")
    print("=" * 50)
    
    # Step 1: Test basic import
    try:
        import matplotlib
        print("✅ Step 1: Basic matplotlib import successful")
        print(f"   Version: {matplotlib.__version__}")
    except Exception as e:
        print(f"❌ Step 1: Basic matplotlib import failed: {e}")
        return False
    
    # Step 2: Test backend setting
    try:
        matplotlib.use('Agg')  # Non-interactive backend
        print("✅ Step 2: Backend set to 'Agg' successfully")
    except Exception as e:
        print(f"❌ Step 2: Setting backend failed: {e}")
        return False
    
    # Step 3: Test pyplot import
    try:
        import matplotlib.pyplot as plt
        print("✅ Step 3: pyplot import successful")
    except Exception as e:
        print(f"❌ Step 3: pyplot import failed: {e}")
        return False
    
    # Step 4: Test figure creation
    try:
        fig, ax = plt.subplots(1, 1, figsize=(8, 6))
        print("✅ Step 4: Figure creation successful")
    except Exception as e:
        print(f"❌ Step 4: Figure creation failed: {e}")
        return False
    
    # Step 5: Test simple plot
    try:
        x = [1, 2, 3, 4, 5]
        y = [2, 4, 6, 8, 10]
        ax.plot(x, y)
        ax.set_title('Test Plot')
        print("✅ Step 5: Simple plot creation successful")
    except Exception as e:
        print(f"❌ Step 5: Plot creation failed: {e}")
        return False
    
    # Step 6: Test saving to memory
    try:
        import io
        buffer = io.BytesIO()
        fig.savefig(buffer, format='png')
        buffer.seek(0)
        plt.close(fig)
        print(f"✅ Step 6: Save to memory successful (size: {len(buffer.getvalue())} bytes)")
    except Exception as e:
        print(f"❌ Step 6: Save to memory failed: {e}")
        return False
    
    # Step 7: Test temporary file saving
    try:
        import tempfile
        with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as tmp_file:
            temp_path = tmp_file.name
        
        fig2, ax2 = plt.subplots(1, 1)
        ax2.bar(['A', 'B', 'C'], [1, 2, 3])
        fig2.savefig(temp_path, dpi=150, bbox_inches='tight')
        plt.close(fig2)
        
        import os
        if os.path.exists(temp_path):
            file_size = os.path.getsize(temp_path)
            print(f"✅ Step 7: Temporary file save successful (size: {file_size} bytes)")
            os.remove(temp_path)  # Clean up
        else:
            print("❌ Step 7: Temporary file was not created")
            return False
            
    except Exception as e:
        print(f"❌ Step 7: Temporary file save failed: {e}")
        return False
    
    print("\n🎉 All matplotlib tests passed!")
    return True

if __name__ == "__main__":
    success = test_matplotlib_step_by_step()
    
    if success:
        print("\n✅ Matplotlib is working correctly!")
        print("Ready to add charts back to PDF generation.")
    else:
        print("\n❌ Matplotlib has issues that need to be resolved.")
        exit(1) 