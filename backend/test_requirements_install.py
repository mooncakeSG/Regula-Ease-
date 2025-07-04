#!/usr/bin/env python3
"""
Test script to verify requirements installation for Fly.io deployment
This simulates the pip install process and tests all imports
"""

import subprocess
import sys
import os
import tempfile
import shutil

def run_command(cmd, description):
    """Run a command and return success status"""
    print(f"\n🧪 {description}")
    print(f"Running: {cmd}")
    
    try:
        result = subprocess.run(cmd, shell=True, check=True, 
                              capture_output=True, text=True)
        print(f"✅ {description} - SUCCESS")
        if result.stdout:
            print(f"Output: {result.stdout}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} - FAILED")
        print(f"Error: {e.stderr}")
        return False

def test_package_installation():
    """Test installing packages from requirements.txt"""
    print("=" * 60)
    print("🚀 Testing Requirements Installation")
    print("=" * 60)
    
    # Read requirements.txt
    with open('requirements.txt', 'r') as f:
        requirements = f.read().strip()
    
    print(f"Requirements to test:\n{requirements}")
    
    # Test individual package installation
    packages = [
        "Flask==2.3.3",
        "Flask-CORS==4.0.0", 
        "python-dotenv==1.0.0",
        "requests>=2.32.2",
        "gunicorn==21.2.0",
        "fpdf2==2.7.6",
        "matplotlib>=3.10.0"
    ]
    
    failed_packages = []
    
    for package in packages:
        # Test dry-run installation
        cmd = f"pip install --dry-run --quiet {package}"
        if not run_command(cmd, f"Testing {package}"):
            failed_packages.append(package)
    
    return len(failed_packages) == 0, failed_packages

def test_imports():
    """Test importing all required modules"""
    print("\n" + "=" * 60)
    print("🧪 Testing Package Imports")
    print("=" * 60)
    
    import_tests = [
        ("Flask", "flask"),
        ("Flask-CORS", "flask_cors"),
        ("python-dotenv", "dotenv"),
        ("requests", "requests"),
        ("gunicorn", "gunicorn"),
        ("fpdf2", "fpdf"),
        ("matplotlib", "matplotlib"),
        ("matplotlib.pyplot", "matplotlib.pyplot"),
        ("matplotlib.patches", "matplotlib.patches")
    ]
    
    failed_imports = []
    
    for package_name, import_name in import_tests:
        try:
            __import__(import_name)
            print(f"✅ {package_name} import successful")
        except ImportError as e:
            print(f"❌ {package_name} import failed: {e}")
            failed_imports.append(package_name)
    
    return len(failed_imports) == 0, failed_imports

def test_matplotlib_functionality():
    """Test matplotlib functionality specifically"""
    print("\n" + "=" * 60)
    print("🧪 Testing Matplotlib Functionality")
    print("=" * 60)
    
    try:
        import matplotlib
        matplotlib.use('Agg')  # Non-interactive backend
        import matplotlib.pyplot as plt
        import matplotlib.patches as patches
        
        # Test creating a simple plot
        fig, ax = plt.subplots(figsize=(6, 4))
        ax.bar(['A', 'B', 'C'], [1, 2, 3])
        ax.set_title('Test Chart')
        
        # Test saving to memory
        import io
        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        
        if len(buf.getvalue()) > 0:
            print("✅ Matplotlib chart generation successful")
            print(f"   Chart size: {len(buf.getvalue())} bytes")
            return True
        else:
            print("❌ Matplotlib chart generation failed - empty output")
            return False
            
    except Exception as e:
        print(f"❌ Matplotlib functionality test failed: {e}")
        return False

def test_fpdf2_functionality():
    """Test fpdf2 functionality"""
    print("\n" + "=" * 60)
    print("🧪 Testing fpdf2 Functionality")
    print("=" * 60)
    
    try:
        from fpdf import FPDF
        
        # Test creating a simple PDF
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font('Helvetica', 'B', 16)
        pdf.cell(40, 10, 'Test PDF')
        
        # Test output
        pdf_output = pdf.output()
        
        if len(pdf_output) > 0:
            print("✅ fpdf2 PDF generation successful")
            print(f"   PDF size: {len(pdf_output)} bytes")
            return True
        else:
            print("❌ fpdf2 PDF generation failed - empty output")
            return False
            
    except Exception as e:
        print(f"❌ fpdf2 functionality test failed: {e}")
        return False

def check_system_dependencies():
    """Check if system dependencies are available"""
    print("\n" + "=" * 60)
    print("🧪 Checking System Dependencies")
    print("=" * 60)
    
    # Check for required system libraries
    system_deps = [
        ("pkg-config", "pkg-config --version"),
        ("freetype", "pkg-config --exists freetype2"),
        ("libpng", "pkg-config --exists libpng"),
        ("fontconfig", "fc-list --version"),
    ]
    
    missing_deps = []
    
    for dep_name, check_cmd in system_deps:
        if run_command(check_cmd, f"Checking {dep_name}"):
            print(f"✅ {dep_name} is available")
        else:
            print(f"⚠️ {dep_name} may not be available")
            missing_deps.append(dep_name)
    
    return len(missing_deps) == 0, missing_deps

def main():
    """Run all requirement tests"""
    print("=" * 60)
    print("🚀 Fly.io Requirements Installation Test")
    print("=" * 60)
    
    # Change to backend directory if needed
    if not os.path.exists('requirements.txt'):
        if os.path.exists('backend/requirements.txt'):
            os.chdir('backend')
        else:
            print("❌ requirements.txt not found!")
            return False
    
    # Run all tests
    tests = [
        ("Package Installation", test_package_installation),
        ("Package Imports", test_imports),
        ("Matplotlib Functionality", test_matplotlib_functionality),
        ("fpdf2 Functionality", test_fpdf2_functionality),
        ("System Dependencies", check_system_dependencies)
    ]
    
    passed = 0
    total = len(tests)
    failures = []
    
    for test_name, test_func in tests:
        print(f"\n{'='*60}")
        print(f"Running: {test_name}")
        print('='*60)
        
        try:
            if callable(test_func):
                result = test_func()
                if isinstance(result, tuple):
                    success, details = result
                    if not success:
                        failures.append(f"{test_name}: {details}")
                else:
                    success = result
                    if not success:
                        failures.append(test_name)
            else:
                success = test_func
                if not success:
                    failures.append(test_name)
            
            if success:
                passed += 1
                print(f"✅ {test_name} - PASSED")
            else:
                print(f"❌ {test_name} - FAILED")
                
        except Exception as e:
            print(f"❌ {test_name} - ERROR: {e}")
            failures.append(f"{test_name}: {e}")
    
    # Summary
    print("\n" + "=" * 60)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    print("=" * 60)
    
    if passed == total:
        print("🎉 All requirements tests passed!")
        print("✅ Ready for Fly.io deployment!")
    else:
        print("⚠️ Some tests failed:")
        for failure in failures:
            print(f"   - {failure}")
        print("\nℹ️ Check the failures above and update requirements/Dockerfile as needed.")
    
    return passed == total

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 