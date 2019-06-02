## Downloads

In case the versioning is confusing, here's a simple explanation. The first
three numbers are the major, minor, and patch version, respectively. The fourth
number, the "tweak", is incremented for every single code change. Real releases
are those for which the fourth number is a 0. Anything with a non-zero tweak is
a prerelease, which means increased functionality but with a significantly
higher risk of encountering bugs. The latest prerelease is sometimes added here
for convenience, but only the latest. This means, for instance, that when 
0.0.5.6 is made available, 0.0.5.5 is taken down. All non-prereleases will
however be available indefinitely, so 0.0.5.0 won't be taken down when 0.0.6 is
released.

If only three numbers are shown (e.g. 0.0.5), they are major minor and patch,
and it is not a prerelease.

Practically speaking, the goal is to increment the major release version once a
year.

RC stands for Release Candidate. Before any minor or major release, a RC is put
out to help find any bugs before the official release. RCs can be viewed as a
form of prerelease which is less likely to be bugged and more official. Whereas
prereleases are released at my discretion based on my local work, release
candidates are released before every minor or major version increase.

### 0.1.0 RC 2

* Graphical API added for plugins usage
	* Windows
	* Radio buttons
	* Normal buttons
	* Menus
	* Menu items
	* Submenus
	* Labels
	* Checkboxes
	* Horizontal and vertical widget groups
	* Extremely simple API
	* Supports adding widgets and menus to the root window
* Example plugin added to demonstrate new architecture's simplicity
* **WINDOWS SUPPORT ADDED!** Which, as a result, meant more widespread code base changes.
* C++ has been eradicated from most plugins, which are now in "pure" C
* The editor has seen many improvements:
	* Can now build files before they have been saved
	* The CPU to send the ROM to can now be selected from a menu
	* The assembler to use to build the code can now be selected from a menu
	* The UI has been cleaned up:
		* The open/save dialog no longer replaces the editor, instead integrating within it smoothly
		* The message window at the bottom is now resizable independent of the main editor window
		* The message window is now its own separate, linked window instead of a child window, making it much more readable
* The assembler's log can be shown even upon successful assembly through a menu option
* Revert usage of std::functions in I/O handlers
* API is now fully usable from C, no C++ required
* Shell plugin removed
* Dummy assembler added
* Editor no longer defaults to using the standard library
* Debug port added (port 2, output only, output is dumped to stdio)
* Plugin API reworked to use C
* Now uses [scas](https://github.com/knightos/scas)'s `list_t` type internally
for dynamic arrays in C
* Replace "libc" with pure assembly standard library

#### Linux

##### Wayland

* [Debian Package](https://github.com/Zany80/Zany80/releases/download/v0.1.0-rc2/Zany80-0.1.0.0-RC2-Wayland.deb)
* [Tarball](https://github.com/Zany80/Zany80/releases/download/v0.1.0-rc2/Zany80-0.1.0.0-RC2-Wayland.tar.gz)

##### X11

* [Debian Package](https://github.com/Zany80/Zany80/releases/download/v0.1.0-rc2/Zany80-0.1.0.0-RC2-OpenGL.deb)
* [Tarball](https://github.com/Zany80/Zany80/releases/download/v0.1.0-rc2/Zany80-0.1.0.0-RC2-OpenGL.tar.gz)

#### Windows

* [64-bit Installer](https://github.com/Zany80/Zany80/releases/download/v0.1.0-rc2/Zany80-0.1.0.0-RC2.exe)

### 0.1.0 RC 1

#### Linux

* [Debian Package](https://github.com/Zany80/Zany80/releases/download/v0.1.0-rc1/Zany80.0.1.0.Release.Candidate.1.deb)
* [Tarball](https://github.com/Zany80/Zany80/releases/download/v0.1.0-rc1/Zany80.0.1.0.Release.Candidate.1.tar.gz)

### 0.0.3

* Adds internal plugin dependency system
* Adds plugin named function support
* Switch I/O handlers to use <code>std::function</code>s instead of lambdas to simplify I/O binding
* Remove old unusable plugins
* Remove display from CPU plugin, create separate display plugin
* Rename scas' plugin from to assembler (from official_assembler)
* Add Editor dependency on Toolchain plugin
* Improve error handling
* Improve plugin hub
* A bug fix for the installer generation - packages now include the libc which is required for building programs
* Editor now has proper highlighting
* Editor now gives details on some functions and instructions when you hover over them
* Various minor bug fixes and tweaks
* Web version:
	* Downloading a file now uses Windows line endings (\r\n instead of \n)
	* Can now load local files via the input box on the bottom of the screen

#### Linux

* [Debian Package](https://github.com/Zany80/Zany80/releases/download/0.0.3.0-61cffae/Zany80-0.0.3.0-Linux.deb)
* [Tarball](https://github.com/Zany80/Zany80/releases/download/0.0.3.0-61cffae/Zany80-0.0.3.0-Linux.tar.gz)

### 0.2.0

* Embedded development tools, including an editor with syntax highlighting & intuitive error marking
* Live testing (a game can be run from the editor via Build -> Execute)
* Web version:
	* Now fully functional (editor, CPU, shell, etc. all work) with most bugs fixed
	* Can download files from the editor
